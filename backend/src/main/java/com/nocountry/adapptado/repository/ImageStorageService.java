package com.nocountry.adapptado.repository;

public interface ImageStorageService {
    String uploadImage(byte[] fileData, String fileName);
    void deleteImage(String imageUrl);
}