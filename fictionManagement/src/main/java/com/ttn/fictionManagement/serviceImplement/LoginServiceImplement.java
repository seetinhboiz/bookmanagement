package com.ttn.fictionManagement.serviceImplement;

import com.ttn.fictionManagement.service.LoginService;
import com.ttn.fictionManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginServiceImplement implements LoginService {
    private final UserService userService;

    @Autowired
    public LoginServiceImplement(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean authenticate(String username, String password) {
        if (findUserByUsername(username)) {
            return userService.checkPassword(password, userService.findByUsername(username).getPassword());
        }
        return false;
    }

    @Override
    public boolean findUserByUsername(String username) {
        return userService.findByUsername(username) != null;
    }

    @Override
    public Boolean checkUsernameIsUnique(String usernameInput) {
        List<String> listUsername = userService.findAllUsername();
        for (String username : listUsername) {
            if (username.equals(usernameInput)) {
                return false;
            }
        }
        return true;
    }
}
