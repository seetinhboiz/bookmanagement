package com.ttn.fictionManagement.serviceImplement;

import com.ttn.fictionManagement.dto.UserDTO;
import com.ttn.fictionManagement.entity.User;
import com.ttn.fictionManagement.repository.UserRepository;
import com.ttn.fictionManagement.service.FileUploadService;
import com.ttn.fictionManagement.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImplement implements UserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final FileUploadService fileUploadService;

    @Autowired
    public UserServiceImplement(UserRepository userRepository,
                                ModelMapper modelMapper,
                                FileUploadService fileUploadService) {
        this.userRepository = userRepository;
        this.fileUploadService = fileUploadService;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<UserDTO> findAll() {
        List<User> users = userRepository.findAll(Sort.by(Sort.Direction.ASC, ("username")));
        return users.stream().map(user -> modelMapper.map(user, UserDTO.class)).collect(Collectors.toList());
    }

    @Override
    public UserDTO findById(Long id) {
        return modelMapper.map(userRepository.findById(id), UserDTO.class);
    }

    @Override
    public UserDTO createOrUpdate(UserDTO userDTO) {
        userRepository.save(modelMapper.map(userDTO, User.class));
        return userDTO;
    }

    @Override
    public void deleteUser(long id) {
        UserDTO userDTO = findById(id);
        if (isUserPresent(userDTO)) {
            deleteAvatar(userDTO.getAvatarPublicId());
            userRepository.deleteById(id);
        }
    }

    @Override
    public UserDTO findByUsername(String username) {
        User userbByUsername = userRepository.findByUsername(username);
        return modelMapper.map(userbByUsername, UserDTO.class);
    }

    public boolean isUserPresent(UserDTO user) {
        return user != null;
    }

    public void deleteAvatar(String publicId) {
        try {
            fileUploadService.deleteFile(publicId);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
