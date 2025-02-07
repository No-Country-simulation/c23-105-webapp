package com.nocountry.adapptado.service;

import com.nocountry.adapptado.dto.entrada.ReviewRequestDTO;
import com.nocountry.adapptado.dto.salida.ReviewResponseDTO;
import com.nocountry.adapptado.entity.Place;
import com.nocountry.adapptado.entity.Review;
import com.nocountry.adapptado.exceptions.ResourceNotFoundException;
import com.nocountry.adapptado.repository.PlaceRepository;
import com.nocountry.adapptado.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final PlaceRepository placeRepository;

    public ReviewService(ReviewRepository reviewRepository, PlaceRepository placeRepository) {
        this.reviewRepository = reviewRepository;
        this.placeRepository = placeRepository;
    }

    public List<ReviewResponseDTO> getReviewsByPlace(Long placeId) {
        if (!placeRepository.existsById(placeId)) {
            throw new ResourceNotFoundException("Place not found with id: " + placeId);
        }

        return reviewRepository.findByPlaceIdOrderByIdDesc(placeId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewResponseDTO addReview(ReviewRequestDTO request) {
        validateRating(request.getRating());

        Place place = placeRepository.findById(request.getPlaceId())
                .orElseThrow(() -> new ResourceNotFoundException("Place not found with id: " + request.getPlaceId()));

        Review review = new Review();
        review.setComment(request.getComment());
        review.setRating(request.getRating());
        review.setPlace(place);
        review.setLikes(0);
        review.setDislikes(0);

        Review savedReview = reviewRepository.save(review);

        // Actualizar estadísticas del lugar
        updatePlaceStatistics(place, review.getRating(), true);
        placeRepository.save(place);

        return convertToDTO(savedReview);
    }

    @Transactional
    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + reviewId));

        Place place = review.getPlace();

        // Actualizar estadísticas del lugar antes de eliminar la review
        updatePlaceStatistics(place, review.getRating(), false);

        reviewRepository.delete(review);
        placeRepository.save(place);
    }

    @Transactional
    public void likeReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + reviewId));

        review.setLikes(review.getLikes() + 1);
        reviewRepository.save(review);
    }

    @Transactional
    public void dislikeReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + reviewId));

        review.setDislikes(review.getDislikes() + 1);
        reviewRepository.save(review);
    }

    private void validateRating(Integer rating) {
        if (rating == null || rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
    }

    private void updatePlaceStatistics(Place place, int rating, boolean isAddition) {
        int currentTotal = place.getTotalReviews();
        double currentAverage = place.getAverageRating();

        if (isAddition) {
            // Agregar review
            int newTotal = currentTotal + 1;
            double newAverage = ((currentAverage * currentTotal) + rating) / newTotal;

            place.setTotalReviews(newTotal);
            place.setAverageRating(Math.round(newAverage * 10.0) / 10.0); // Redondear a 1 decimal
        } else {
            // Eliminar review
            if (currentTotal > 1) {
                int newTotal = currentTotal - 1;
                double newAverage = ((currentAverage * currentTotal) - rating) / newTotal;

                place.setTotalReviews(newTotal);
                place.setAverageRating(Math.round(newAverage * 10.0) / 10.0);
            } else {
                // Si era la última review
                place.setTotalReviews(0);
                place.setAverageRating(0.0);
            }
        }
    }

    private ReviewResponseDTO convertToDTO(Review review) {
        ReviewResponseDTO dto = new ReviewResponseDTO();
        dto.setId(review.getId());
        dto.setComment(review.getComment());
        dto.setRating(review.getRating());
        dto.setLikes(review.getLikes());
        dto.setDislikes(review.getDislikes());
        dto.setPlaceId(review.getPlace().getId());
        dto.setPlaceName(review.getPlace().getName());
        dto.setCreatedAt(review.getCreatedAt());
        return dto;
    }
}