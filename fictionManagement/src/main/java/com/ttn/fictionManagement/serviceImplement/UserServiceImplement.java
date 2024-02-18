package com.ttn.fictionManagement.serviceImplement;

import com.ttn.fictionManagement.dto.UserDTO;
import com.ttn.fictionManagement.entity.User;
import com.ttn.fictionManagement.repository.UserRepository;
import com.ttn.fictionManagement.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImplement implements UserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImplement(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<UserDTO> findAll() {
        List<User> users = userRepository.findAll(Sort.by(Sort.Direction.ASC, ("username")));
        return users.stream().map(user -> modelMapper.map(user, UserDTO.class)).collect(Collectors.toList());
    }

    @Override
    public Optional<UserDTO> findById (Long id) {
        Optional<User> userById = userRepository.findById(id);
        return userById.map(user -> modelMapper.map(user, UserDTO.class));
    }

    @Override
    public UserDTO createOrUpdate(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        userRepository.save(user);
        return userDTO;
    }

    @Override
    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }
}
