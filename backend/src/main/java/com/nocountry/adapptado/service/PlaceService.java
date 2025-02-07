package com.nocountry.adapptado.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nocountry.adapptado.dto.entrada.PlaceRequestDTO;
import com.nocountry.adapptado.dto.salida.PlaceResponseDTO;
import com.nocountry.adapptado.entity.Place;
import com.nocountry.adapptado.exceptions.DuplicatePlaceException;
import com.nocountry.adapptado.exceptions.ResourceNotFoundException;
import com.nocountry.adapptado.repository.ImageStorageService;
import com.nocountry.adapptado.repository.PlaceRepository;
import com.nocountry.adapptado.utils.DistanceCalculator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final ImageStorageService imageStorageService;

    public PlaceService(PlaceRepository placeRepository, ImageStorageService imageStorageService) {
        this.placeRepository = placeRepository;
        this.imageStorageService = imageStorageService;
    }

    public List<PlaceResponseDTO> getAllPlaces() {
        return placeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PlaceResponseDTO getPlaceById(Long id) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Place not found with id: " + id));
        return convertToDTO(place);
    }

    public List<PlaceResponseDTO> searchPlacesByName(String name) {
        return placeRepository.findByNameContainingIgnoreCase(name).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<String> getAllCategories() {
        return placeRepository.findDistinctCategories();
    }

    @Transactional
    public PlaceResponseDTO addPlace(PlaceRequestDTO requestDTO) {
        log.info("Processing place request: {}", requestDTO);

        // Validar y procesar el DTO
        PlaceRequestDTO processedRequest = processPlaceRequest(requestDTO);

        // Validaciones
        validateCoordinates(processedRequest.getLatitude(), processedRequest.getLongitude());
        validateDuplicatePlaces(processedRequest.getLatitude(), processedRequest.getLongitude());

        // Procesar imágenes
        List<String> imageUrls = uploadImages(processedRequest.getImages());

        // Crear y configurar el lugar
        Place place = createPlaceFromDTO(processedRequest, imageUrls);

        // Guardar y convertir a respuesta
        Place savedPlace = placeRepository.save(place);
        return convertToDTO(savedPlace);
    }
    private void updatePlaceFromDTO(Place place, PlaceRequestDTO dto, List<String> accessibilityTags) {
        place.setName(dto.getName());
        place.setCategory(dto.getCategory());
        place.setDescription(dto.getDescription());
        place.setLatitude(dto.getLatitude());
        place.setLongitude(dto.getLongitude());
        place.setAccessibilityTags(new ArrayList<>(accessibilityTags)); // Aseguramos una nueva lista

        log.info("Updated place with accessibility tags: {}", place.getAccessibilityTags());
    }
    @Transactional
    public PlaceResponseDTO updatePlace(Long id, PlaceRequestDTO request) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Place not found with id: " + id));

        validateCoordinates(request.getLatitude(), request.getLongitude());

        if (!place.getLatitude().equals(request.getLatitude()) ||
                !place.getLongitude().equals(request.getLongitude())) {
            validateDuplicatePlaces(request.getLatitude(), request.getLongitude());
        }

        List<String> imageUrls = new ArrayList<>(place.getImageUrls());
        if (request.getImages() != null && !request.getImages().isEmpty()) {
            imageUrls.addAll(uploadImages(request.getImages()));
        }

        List<String> accessibilityTags = parseAccessibilityTags(request.getAccessibilityTagsStr());

        updatePlaceFromDTO(place, request, accessibilityTags);
        place.setImageUrls(imageUrls);

        Place updatedPlace = placeRepository.save(place);
        return convertToDTO(updatedPlace);
    }

    public List<PlaceResponseDTO> getFilteredNearbyPlaces(
            double userLatitude,
            double userLongitude,
            double radiusKm,
            String category,
            List<String> accessibilityTags) {

        validateCoordinates(userLatitude, userLongitude);

        return placeRepository.findAll().stream()
                .filter(place -> filterPlace(place, userLatitude, userLongitude, radiusKm, category, accessibilityTags))
                .sorted(Comparator.comparingDouble(place ->
                        DistanceCalculator.calculate(userLatitude, userLongitude, place.getLatitude(), place.getLongitude())))
                .map(place -> convertToDTOWithDistance(place, userLatitude, userLongitude))
                .collect(Collectors.toList());
    }

    @Transactional
    public void deletePlace(Long id) {
        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Place not found with id: " + id));

        // Eliminar imágenes asociadas
        if (place.getImageUrls() != null) {
            place.getImageUrls().forEach(imageStorageService::deleteImage);
        }

        placeRepository.deleteById(id);
    }

    private void validateCoordinates(Double latitude, Double longitude) {
        if (latitude == null || longitude == null ||
                latitude < -90 || latitude > 90 ||
                longitude < -180 || longitude > 180) {
            throw new IllegalArgumentException("Invalid coordinates");
        }
    }

    private void validateDuplicatePlaces(Double latitude, Double longitude) {
        double maxDistance = 0.1; // 100 metros aproximadamente
        List<Place> nearbyPlaces = placeRepository.findAll().stream()
                .filter(place -> DistanceCalculator.calculate(
                        latitude, longitude, place.getLatitude(), place.getLongitude()) <= maxDistance)
                .toList();

        if (!nearbyPlaces.isEmpty()) {
            throw new DuplicatePlaceException("A similar place already exists nearby");
        }
    }
    private Place createPlaceFromDTO(PlaceRequestDTO dto, List<String> imageUrls) {
        Place place = new Place();
        place.setName(dto.getName());
        place.setCategory(dto.getCategory());
        place.setDescription(dto.getDescription());
        place.setLatitude(dto.getLatitude());
        place.setLongitude(dto.getLongitude());
        place.setAccessibilityTags(dto.getAccessibilityTags());
        place.setImageUrls(imageUrls);
        place.setAverageRating(0.0);
        place.setTotalReviews(0);
        return place;
    }
    private List<String> uploadImages(List<MultipartFile> images) {
        if (images == null || images.isEmpty()) {
            return new ArrayList<>();
        }

        return images.stream()
                .map(image -> {
                    try {
                        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                        return imageStorageService.uploadImage(image.getBytes(), fileName);
                    } catch (Exception e) {
                        throw new RuntimeException("Failed to upload image", e);
                    }
                })
                .collect(Collectors.toList());
    }

    private boolean filterPlace(
            Place place,
            double userLatitude,
            double userLongitude,
            double radiusKm,
            String category,
            List<String> accessibilityTags) {

        double distance = DistanceCalculator.calculate(
                userLatitude, userLongitude, place.getLatitude(), place.getLongitude());

        boolean withinRadius = distance <= radiusKm;
        boolean matchesCategory = category == null || place.getCategory().equalsIgnoreCase(category);
        boolean matchesTags = accessibilityTags == null || accessibilityTags.isEmpty() ||
                accessibilityTags.stream().allMatch(tag -> place.getAccessibilityTags().contains(tag));

        return withinRadius && matchesCategory && matchesTags;
    }

    private PlaceResponseDTO convertToDTO(Place place) {
        PlaceResponseDTO dto = new PlaceResponseDTO();
        dto.setId(place.getId());
        dto.setName(place.getName());
        dto.setCategory(place.getCategory());
        dto.setDescription(place.getDescription());
        dto.setLatitude(place.getLatitude());
        dto.setLongitude(place.getLongitude());
        dto.setAccessibilityTags(place.getAccessibilityTags());
        dto.setImageUrls(place.getImageUrls());
        dto.setCreatedAt(place.getCreatedAt());
        dto.setAverageRating(place.getAverageRating());
        dto.setTotalReviews(place.getTotalReviews());
        return dto;
    }
    private PlaceResponseDTO convertToDTOWithDistance(Place place, double userLatitude, double userLongitude) {
        PlaceResponseDTO dto = convertToDTO(place);
        dto.setDistance(DistanceCalculator.calculate(
                userLatitude, userLongitude, place.getLatitude(), place.getLongitude()));
        return dto;
    }

    private List<String> parseAccessibilityTags(String tagsStr) {
        if (tagsStr == null || tagsStr.trim().isEmpty()) {
            return new ArrayList<>();
        }

        try {
            // Intentar parsear como JSON si comienza con [ y termina con ]
            if (tagsStr.trim().startsWith("[") && tagsStr.trim().endsWith("]")) {
                ObjectMapper mapper = new ObjectMapper();
                return mapper.readValue(tagsStr, new TypeReference<List<String>>() {});
            }

            // Si no es JSON, separar por comas
            return Arrays.stream(tagsStr.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.warn("Error parsing accessibility tags: {}. Using comma separator instead.", e.getMessage());
            return Arrays.stream(tagsStr.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());
        }
    }
    private PlaceRequestDTO processPlaceRequest(PlaceRequestDTO request) {
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (request.getCategory() == null || request.getCategory().trim().isEmpty()) {
            throw new IllegalArgumentException("Category is required");
        }

        // Procesar accessibilityTags
        if (request.getAccessibilityTagsStr() != null) {
            request.setAccessibilityTags(parseAccessibilityTags(request.getAccessibilityTagsStr()));
        } else {
            request.setAccessibilityTags(new ArrayList<>());
        }

        return request;
    }
}