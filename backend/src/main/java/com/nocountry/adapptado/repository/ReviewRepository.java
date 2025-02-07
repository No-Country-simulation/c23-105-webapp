package com.nocountry.adapptado.repository;

import com.nocountry.adapptado.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByPlaceIdOrderByIdDesc(Long placeId);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.place.id = :placeId")
    long countByPlaceId(@Param("placeId") Long placeId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.place.id = :placeId")
    Double getAverageRatingByPlaceId(@Param("placeId") Long placeId);
}