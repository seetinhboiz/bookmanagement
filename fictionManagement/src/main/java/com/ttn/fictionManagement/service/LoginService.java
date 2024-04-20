package com.ttn.fictionManagement.service;

public interface LoginService {
    public boolean authenticate(String username, String password);
    public boolean findUserByUsername(String username);
}
