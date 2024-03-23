package com.ttn.fictionManagement.service;

import com.ttn.fictionManagement.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public List<UserDTO> findAll();
    public UserDTO findById(Long id);
    public UserDTO createOrUpdate (UserDTO userDTO);
    public void deleteUser(long id);
    public UserDTO findByUsername(String username);
}
