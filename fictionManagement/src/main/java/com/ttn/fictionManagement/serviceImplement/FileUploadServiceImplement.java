package com.ttn.fictionManagement.serviceImplement;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import com.ttn.fictionManagement.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;

@Service
public class FileUploadServiceImplement implements FileUploadService {

    private final Cloudinary cloudinary;

    @Autowired
    public FileUploadServiceImplement(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }


    @Override
    public Map uploadFile(MultipartFile multipartFile) {
        try {
            Map data = this.cloudinary.uploader().upload(multipartFile.getBytes(), Map.of());
            return data;
        } catch (IOException io) {
            throw new RuntimeException("Image upload fail");
        }
    }

    @Override
    public void deleteFile(String publicId) throws IOException {
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
}
