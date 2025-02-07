package com.nocountry.adapptado.controller;

import com.nocountry.adapptado.dto.entrada.PlaceRequestDTO;
import com.nocountry.adapptado.dto.salida.PlaceResponseDTO;
import com.nocountry.adapptado.service.PlaceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/places")
@CrossOrigin(origins = "*")
@Tag(name = "Places", description = "API para gestionar lugares accesibles")
public class PlaceController {

    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @Operation(summary = "Obtener todos los lugares",
            description = "Recupera una lista de todos los lugares registrados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de lugares recuperada exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PlaceResponseDTO.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping
    public ResponseEntity<List<PlaceResponseDTO>> getAllPlaces() {
        return ResponseEntity.ok(placeService.getAllPlaces());
    }

    @Operation(summary = "Obtener lugar por ID",
            description = "Recupera un lugar específico por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lugar encontrado",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PlaceResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Lugar no encontrado"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/{id}")
    public ResponseEntity<PlaceResponseDTO> getPlaceById(
            @Parameter(description = "ID del lugar", required = true)
            @PathVariable Long id) {
        return ResponseEntity.ok(placeService.getPlaceById(id));
    }

    @Operation(summary = "Buscar lugares por nombre",
            description = "Busca lugares que contengan el texto especificado en su nombre")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Búsqueda realizada exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PlaceResponseDTO.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/search")
    public ResponseEntity<List<PlaceResponseDTO>> searchPlacesByName(
            @Parameter(description = "Texto a buscar en el nombre", required = true)
            @RequestParam String name) {
        return ResponseEntity.ok(placeService.searchPlacesByName(name));
    }

    @Operation(summary = "Obtener lugares cercanos",
            description = "Recupera lugares cercanos a una ubicación específica con filtros opcionales")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Búsqueda realizada exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PlaceResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Parámetros de ubicación inválidos"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/nearby")
    public ResponseEntity<List<PlaceResponseDTO>> getNearbyPlaces(
            @Parameter(description = "Latitud de la ubicación", required = true)
            @RequestParam double latitude,
            @Parameter(description = "Longitud de la ubicación", required = true)
            @RequestParam double longitude,
            @Parameter(description = "Radio de búsqueda en kilómetros")
            @RequestParam(defaultValue = "10") double radiusKm,
            @Parameter(description = "Categoría del lugar")
            @RequestParam(required = false) String category,
            @Parameter(description = "Tags de accesibilidad para filtrar")
            @RequestParam(required = false) List<String> accessibilityTags) {
        return ResponseEntity.ok(placeService.getFilteredNearbyPlaces(latitude, longitude, radiusKm, category, accessibilityTags));
    }

    @Operation(summary = "Obtener todas las categorías",
            description = "Recupera la lista de todas las categorías disponibles")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de categorías recuperada exitosamente"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        return ResponseEntity.ok(placeService.getAllCategories());
    }

    @Operation(summary = "Agregar un nuevo lugar",
            description = "Crea un nuevo lugar con la información proporcionada")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lugar creado exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PlaceResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
            @ApiResponse(responseCode = "409", description = "Ya existe un lugar similar cercano"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PlaceResponseDTO> addPlace(@ModelAttribute PlaceRequestDTO request) {
        log.info("Received form data in controller: {}", request);
        // Imprime todos los campos individualmente para depuración
        log.info("AccessibilityTagsStr: {}", request.getAccessibilityTagsStr());
        return ResponseEntity.ok(placeService.addPlace(request));
    }

    @Operation(summary = "Actualizar un lugar",
            description = "Actualiza la información de un lugar existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lugar actualizado exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PlaceResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
            @ApiResponse(responseCode = "404", description = "Lugar no encontrado"),
            @ApiResponse(responseCode = "409", description = "Ya existe un lugar similar cercano"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PlaceResponseDTO> updatePlace(
            @Parameter(description = "ID del lugar", required = true)
            @PathVariable Long id,
            @Parameter(description = "Datos actualizados del lugar", required = true)
            @ModelAttribute PlaceRequestDTO request) {
        return ResponseEntity.ok(placeService.updatePlace(id, request));
    }

    @Operation(summary = "Eliminar un lugar",
            description = "Elimina un lugar específico por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Lugar eliminado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Lugar no encontrado"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlace(
            @Parameter(description = "ID del lugar a eliminar", required = true)
            @PathVariable Long id) {
        placeService.deletePlace(id);
        return ResponseEntity.noContent().build();
    }
}