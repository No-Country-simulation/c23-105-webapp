package com.nocountry.adapptado.dto.salida;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// PlaceResponseDTO.java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaceResponseDTO {
    private Long id;
    private String name;
    private String category;
    private String description;
    private Double latitude;
    private Double longitude;
    private Double averageRating;
    private Integer totalReviews;
    private List<String> accessibilityTags = new ArrayList<>();
    private List<String> imageUrls = new ArrayList<>();
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Double distance; // Para cuando se buscan lugares cercanos

    public void setDistance(Double distance) {
        if (distance != null) {
            // Redondear a 2 decimales
            this.distance = Math.round(distance * 100.0) / 100.0;
        }
    }
}