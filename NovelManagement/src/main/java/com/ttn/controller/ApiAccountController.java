/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ttn.controller;

import com.ttn.service.AccountService;
import java.util.List;
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
public class ApiAccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/accounts")
    public ResponseEntity<?> getAccounts(@RequestParam Map<String, String> param) {
        return new ResponseEntity<>(this.accountService.getAccounts(param), HttpStatus.OK);
    }

    @PostMapping("/account")
    public ResponseEntity<?> createAccount() {
        return null;
    }

    @PutMapping("/account/{id}")
    public ResponseEntity<?> updateAccount() {
        return null;
    }

    @DeleteMapping("/account/{id}")
    public ResponseEntity<?> deleteAccount() {
        return null;
    }
}
