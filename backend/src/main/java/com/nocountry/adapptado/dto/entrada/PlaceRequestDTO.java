package com.nocountry.adapptado.dto.entrada;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlaceRequestDTO {

    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    private String name;

    @NotBlank(message = "Category is required")
    private String category;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    @NotNull(message = "Latitude is required")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    private Double longitude;

    private String accessibilityTagsStr;

    private List<String> accessibilityTags = new ArrayList<>();

    @JsonIgnore
    private List<MultipartFile> images = new ArrayList<>();

    @Override
    public String toString() {
        return "PlaceRequestDTO{" +
                "name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", description='" + description + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", accessibilityTagsStr='" + accessibilityTagsStr + '\'' +
                ", accessibilityTags=" + accessibilityTags +
                ", images=" + (images != null ? images.size() : 0) + " files" +
                '}';
    }
}