package com.ttn.fictionManagement.controller;

import com.ttn.fictionManagement.service.S3UploadFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/s3")
@CrossOrigin
public class S3UploadFileAPI {
    private S3UploadFileService s3UploadFileService;

    @Autowired
    public S3UploadFileAPI(S3UploadFileService s3UploadFileService) {
        this.s3UploadFileService = s3UploadFileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam(value = "file") MultipartFile file) {
        return new ResponseEntity<>(s3UploadFileService.uploadFile(file), HttpStatus.CREATED);
    }

    @GetMapping("/getUrl/{fileName}")
    public ResponseEntity<String> getFileUrl(@PathVariable String fileName) {
        return new ResponseEntity<>(s3UploadFileService.getFileUrl(fileName), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName) {
        return new ResponseEntity<>(s3UploadFileService.deleteFile(fileName), HttpStatus.NO_CONTENT);
    }
}
