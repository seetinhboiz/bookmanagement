package com.ttn.fictionManagement.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public interface S3UploadFileService {
    String uploadFile(MultipartFile file);

    String getFileUrl(String fileName);
    File convertMultiPartFileToFile(MultipartFile file);
    String deleteFile(String fileName);
}
