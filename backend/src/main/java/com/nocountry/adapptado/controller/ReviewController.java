package com.nocountry.adapptado.controller;

import com.nocountry.adapptado.dto.entrada.ReviewRequestDTO;
import com.nocountry.adapptado.dto.salida.ReviewResponseDTO;
import com.nocountry.adapptado.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
@Tag(name = "Reviews", description = "API para gestionar las reseñas de lugares")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @Operation(summary = "Obtener reseñas por lugar",
            description = "Recupera todas las reseñas asociadas a un lugar específico")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reseñas encontradas",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ReviewResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Lugar no encontrado"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/place/{placeId}")
    public ResponseEntity<List<ReviewResponseDTO>> getReviewsByPlace(
            @Parameter(description = "ID del lugar", required = true)
            @PathVariable Long placeId) {
        return ResponseEntity.ok(reviewService.getReviewsByPlace(placeId));
    }

    @Operation(summary = "Agregar una nueva reseña",
            description = "Crea una nueva reseña para un lugar específico")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reseña creada exitosamente",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ReviewResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
            @ApiResponse(responseCode = "404", description = "Lugar no encontrado"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PostMapping
    public ResponseEntity<ReviewResponseDTO> addReview(
            @Parameter(description = "Datos de la reseña", required = true)
            @RequestBody ReviewRequestDTO request) {
        return ResponseEntity.ok(reviewService.addReview(request));
    }

    @Operation(summary = "Eliminar una reseña",
            description = "Elimina una reseña específica por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Reseña eliminada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Reseña no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @Parameter(description = "ID de la reseña a eliminar", required = true)
            @PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Dar like a una reseña",
            description = "Incrementa el contador de likes de una reseña específica")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Like registrado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Reseña no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PostMapping("/{reviewId}/like")
    public ResponseEntity<Void> likeReview(
            @Parameter(description = "ID de la reseña", required = true)
            @PathVariable Long reviewId) {
        reviewService.likeReview(reviewId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Dar dislike a una reseña",
            description = "Incrementa el contador de dislikes de una reseña específica")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dislike registrado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Reseña no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PostMapping("/{reviewId}/dislike")
    public ResponseEntity<Void> dislikeReview(
            @Parameter(description = "ID de la reseña", required = true)
            @PathVariable Long reviewId) {
        reviewService.dislikeReview(reviewId);
        return ResponseEntity.ok().build();
    }
}