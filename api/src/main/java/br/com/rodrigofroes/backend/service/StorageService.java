package br.com.rodrigofroes.backend.service;


import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import br.com.rodrigofroes.backend.configuration.exception.StorageHandlerException;

import java.io.IOException;
import java.io.InputStream;

@Service
public class StorageService {
    
    private Logger logger = LoggerFactory.getLogger(StorageService.class.getName());

    @Autowired
    private MinioClient minioClient;

    @Value("${spring.minio.url}")
    private String urlMinio;

    public String uploadFile(String bucketName, String objectName, InputStream inputStream, String contentType) {
        try {
            createBucketIfNotExists(bucketName);
            uploadToStorage(bucketName, objectName, inputStream, contentType);
        } catch (Exception e) {
            logger.error("Erro ao processar upload do arquivo: {}", e.getMessage(), e);
            throw new StorageHandlerException("Erro ao processar upload do arquivo: " + e.getMessage());
        }
        return getUrl(bucketName, objectName);
    }

    private void createBucketIfNotExists(String bucketName) throws Exception {
        boolean bucketExists = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
        if (!bucketExists) {
            logger.info("Bucket {} não existe. Criando...", bucketName);
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
        }

        logger.info("Bucket {} já existe ou foi criado com sucesso.", bucketName);
    }

    private void uploadToStorage(String bucketName, String objectName, InputStream inputStream, String contentType)
            throws Exception {
        try {
            int contentLength = inputStream.available();
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .stream(inputStream, contentLength, -1)
                            .contentType(contentType)
                            .build()
            );
            logger.info("Arquivo {} enviado com sucesso para o bucket {}", objectName, bucketName);
        } catch (IOException e) {
            logger.error("Erro ao ler dados do arquivo: {}", e.getMessage(), e);
            throw new StorageHandlerException("Erro ao ler dados do arquivo: " + e.getMessage());
        }
    }

    private String getUrl(String bucketName, String objectName) {
        return String.format(
                "%s/%s/%s",
                urlMinio,
                bucketName,
                objectName
        );
    }
}