package com.ttn.fictionManagement.controller;

import com.ttn.fictionManagement.service.FileUploadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/file")
@CrossOrigin(origins = "http://localhost:4200/")
public class FileUploadAPI {
    private final FileUploadService fileUploadService;

    private final Logger logger = LoggerFactory.getLogger(UserAPI.class);

    @Autowired
    public FileUploadAPI(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Map> uploadFile(@RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            Map data = fileUploadService.uploadFile(file);
            return new ResponseEntity<>(data, HttpStatus.OK);
        } catch (Exception e) {
            loggerException("uploading", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{publicId}")
    public ResponseEntity<String> deleteFile(@PathVariable String publicId) {
        try {
            fileUploadService.deleteFile(publicId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            loggerException("deleting", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public void loggerException(String action, Exception e) {
        logger.error("Error occurred while " + action + " file", e);
    }
}
