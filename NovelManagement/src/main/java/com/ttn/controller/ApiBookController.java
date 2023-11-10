/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ttn.controller;

import com.ttn.service.BookService;
import org.apache.coyote.http11.Http11InputBuffer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
public class ApiBookController {
    @Autowired
    private BookService bookService; 
    
    @GetMapping("/books")
    public ResponseEntity<?> getBooks() {
        return new ResponseEntity<>(this.bookService.getBooks(), HttpStatus.OK);
    }
    
    @PostMapping("/book")
    public ResponseEntity<?> createBook() {
        return null;
    }
    
    @PutMapping("/book/{id}")
    public ResponseEntity<?> updateBook() {
        return null;
    }
    
    @DeleteMapping("/book/{id}")
    public ResponseEntity<?> deleteBook() {
        return null;
    }
}
