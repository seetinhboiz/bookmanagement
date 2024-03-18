package com.ttn.fictionManagement.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface FileUploadService {
    String getFileUrl(String publicId) throws Exception;
//    String uploadFile(MultipartFile multipartFile) throws IOException;
    Map uploadFile(MultipartFile multipartFile) throws IOException;
    void deleteFile(String imageUrl);
}
