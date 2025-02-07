package com.nocountry.adapptado.configuration;

import com.nocountry.adapptado.service.CloudImageStorageService;
import com.nocountry.adapptado.repository.ImageStorageService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class StorageConfig {

    @Bean
    public ImageStorageService imageStorageService(S3Client s3Client) {
        return new CloudImageStorageService(s3Client);
    }
}