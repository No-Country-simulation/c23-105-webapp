package com.nocountry.adapptado.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String comment;

    @Column(nullable = false)
    private Integer rating;

    private Integer likes = 0;
    private Integer dislikes = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Place place;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}