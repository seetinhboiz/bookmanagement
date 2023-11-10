/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ttn.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/api")
public class ApiChapterController {
    @GetMapping("/chapters")
    public ResponseEntity<?> getBookTags() {
        return null;
    }
    
    @PostMapping("/chapter")
    public ResponseEntity<?> createBookTag() {
        return null;
    }
    
    @PutMapping("/chapter/{id}")
    public ResponseEntity<?> updateBookTag() {
        return null;
    }
    
    @DeleteMapping("/chapter/{id}")
    public ResponseEntity<?> deleteBookTag() {
        return null;
    }
}
