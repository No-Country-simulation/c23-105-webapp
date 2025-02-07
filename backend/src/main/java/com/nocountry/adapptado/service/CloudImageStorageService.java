package com.nocountry.adapptado.service;

import com.nocountry.adapptado.repository.ImageStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

public class CloudImageStorageService implements ImageStorageService {
    private static final Logger logger = LoggerFactory.getLogger(CloudImageStorageService.class);

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.s3.endpoint:#{null}}")
    private String endpoint;

    private final S3Client s3Client;

    public CloudImageStorageService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    @Override
    public String uploadImage(byte[] fileData, String fileName) {
        try {
            // Verificar si el bucket existe, si no, crearlo
            if (!bucketExists()) {
                createBucket();
            }

            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(getContentType(fileName))
                    .build();

            s3Client.putObject(request, RequestBody.fromBytes(fileData));

            // Construir URL basada en el entorno
            if (endpoint != null) {
                // MinIO local
                return endpoint + "/" + bucketName + "/" + fileName;
            } else {
                // AWS S3
                return "https://" + bucketName + ".s3.amazonaws.com/" + fileName;
            }

        } catch (Exception e) {
            logger.error("Error uploading file: {}", e.getMessage());
            throw new RuntimeException("Failed to upload file", e);
        }
    }

    @Override
    public void deleteImage(String imageUrl) {
        try {
            String key = extractKeyFromUrl(imageUrl);
            DeleteObjectRequest request = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3Client.deleteObject(request);
        } catch (Exception e) {
            logger.error("Error deleting file: {}", e.getMessage());
            throw new RuntimeException("Failed to delete file", e);
        }
    }

    private boolean bucketExists() {
        try {
            s3Client.headBucket(HeadBucketRequest.builder().bucket(bucketName).build());
            return true;
        } catch (NoSuchBucketException e) {
            return false;
        }
    }

    private void createBucket() {
        try {
            CreateBucketRequest request = CreateBucketRequest.builder()
                    .bucket(bucketName)
                    .build();
            s3Client.createBucket(request);

            // Si estamos en entorno local (MinIO), configurar acceso público
            if (endpoint != null) {
                PublicAccessBlockConfiguration publicAccessConfig = PublicAccessBlockConfiguration.builder()
                        .blockPublicAcls(false)
                        .blockPublicPolicy(false)
                        .ignorePublicAcls(false)
                        .restrictPublicBuckets(false)
                        .build();

                PutPublicAccessBlockRequest publicAccessRequest = PutPublicAccessBlockRequest.builder()
                        .bucket(bucketName)
                        .publicAccessBlockConfiguration(publicAccessConfig)
                        .build();

                s3Client.putPublicAccessBlock(publicAccessRequest);
            }
        } catch (Exception e) {
            logger.error("Error creating bucket: {}", e.getMessage());
            throw new RuntimeException("Failed to create bucket", e);
        }
    }

    private String getContentType(String fileName) {
        String extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
        switch (extension) {
            case "jpg":
            case "jpeg":
                return "image/jpeg";
            case "png":
                return "image/png";
            case "gif":
                return "image/gif";
            default:
                return "application/octet-stream";
        }
    }

    private String extractKeyFromUrl(String imageUrl) {
        return imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    }
}