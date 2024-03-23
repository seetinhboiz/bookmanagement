package com.ttn.fictionManagement.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface FileUploadService {
    Map uploadFile(MultipartFile multipartFile) throws IOException;
    void deleteFile(String publicId) throws IOException;
}
