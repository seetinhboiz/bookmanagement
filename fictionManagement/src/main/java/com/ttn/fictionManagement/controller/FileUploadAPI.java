package com.ttn.fictionManagement.controller;

import com.ttn.fictionManagement.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/file")
public class FileUploadAPI {
    private final FileUploadService fileUploadService;

    @Autowired
    public FileUploadAPI(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam(value = "image", required = false) MultipartFile multipartFile) throws IOException {
        String url = fileUploadService.uploadFile(multipartFile);
        return new ResponseEntity<>(url, HttpStatus.CREATED);
    }
}
