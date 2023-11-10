/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ttn.controller;

import com.ttn.service.TagService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Admin
 */
@RestController
@RequestMapping("/api")
public class ApiTagController {
    @Autowired
    private TagService tagService;
    
    @GetMapping("/tags")
    public ResponseEntity<?> getTags(@RequestParam Map<String, String> param) {
        return new ResponseEntity<>(this.tagService.getTags(param), HttpStatus.OK);
    }
    
    @PostMapping("/tag")
    public ResponseEntity<?> createTag() {
        return null;
    }
    
    @PutMapping("/tag/{id}")
    public ResponseEntity<?> updateTag() {
        return null;
    }
    
    @DeleteMapping("/tag/{id}")
    public ResponseEntity<?> deleteTag() {
        return null;
    }
}