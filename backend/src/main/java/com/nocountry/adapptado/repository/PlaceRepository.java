package com.nocountry.adapptado.repository;

import com.nocountry.adapptado.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByCategory(String category);

    @Query("SELECT p FROM Place p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Place> findByNameContainingIgnoreCase(@Param("name") String name);

    @Query("SELECT DISTINCT p.category FROM Place p ORDER BY p.category")
    List<String> findDistinctCategories();
}