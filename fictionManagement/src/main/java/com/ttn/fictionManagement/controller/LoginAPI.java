package com.ttn.fictionManagement.controller;

import com.ttn.fictionManagement.dto.UserDTO;
import com.ttn.fictionManagement.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class LoginAPI {
    private LoginService loginService;

    @Autowired
    public LoginAPI(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/api/login")
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO userDTO) {
        try {
            if (loginService.authenticate(userDTO.getUsername(), userDTO.getPassword())) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/api/login/username")
    public ResponseEntity<Boolean> checkUsernameIsUnique(@RequestBody String username) {
        try {
            return new ResponseEntity<>(loginService.checkUsernameIsUnique(username), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
