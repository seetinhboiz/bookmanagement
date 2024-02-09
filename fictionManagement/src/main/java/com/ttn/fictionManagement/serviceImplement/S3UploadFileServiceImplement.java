package com.ttn.fictionManagement.serviceImplement;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ttn.fictionManagement.service.S3UploadFileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
@Slf4j
public class S3UploadFileServiceImplement implements S3UploadFileService {
    private final String bucketName = "fictionstorage";

    private AmazonS3 amazonS3;

    @Autowired
    public S3UploadFileServiceImplement(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    @Override
    public String uploadFile(MultipartFile file) {
        File fileObject = convertMultiPartFileToFile(file);
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        amazonS3.putObject(new PutObjectRequest(bucketName, fileName, fileObject));
        fileObject.delete();

        return "File uploaded: " + fileName;
    }

    @Override
    public File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (Exception e) {
            log.error("Error converting multipartFile to file", e);
        }

        return convertedFile;
    }

    @Override
    public String deleteFile(String fileName) {
        amazonS3.deleteObject(bucketName, fileName);
        return "Removed: " + fileName;
    }
}