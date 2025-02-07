package com.nocountry.adapptado.dto.salida;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewResponseDTO {
    private Long id;
    private String comment;
    private Integer rating;
    private Integer likes;
    private Integer dislikes;
    private Long placeId;
    private String placeName;
    private LocalDateTime createdAt;
}