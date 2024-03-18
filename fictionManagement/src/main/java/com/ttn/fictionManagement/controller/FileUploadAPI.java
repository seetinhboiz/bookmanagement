package com.ttn.fictionManagement.controller;

import com.ttn.fictionManagement.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/file")
@CrossOrigin
public class FileUploadAPI {
    private final FileUploadService fileUploadService;

    @Autowired
    public FileUploadAPI(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @GetMapping("/{publicId}")
    public ResponseEntity<String> getFileUrl(@PathVariable String publicId) throws Exception {
        return new ResponseEntity<>(fileUploadService.getFileUrl(publicId), HttpStatus.OK);
    }

    @PostMapping("/upload")
    public ResponseEntity<Map> uploadFile(@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        Map data = fileUploadService.uploadFile(file);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFile(@RequestParam String fileUrl) {
        try {
            fileUploadService.deleteFile(fileUrl);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
