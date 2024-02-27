package com.ttn.fictionManagement.serviceImplement;

import com.ttn.fictionManagement.dto.FictionDTO;
import com.ttn.fictionManagement.dto.FictionUserDTO;
import com.ttn.fictionManagement.dto.UserDTO;
import com.ttn.fictionManagement.entity.Fiction;
import com.ttn.fictionManagement.repository.FictionRepository;
import com.ttn.fictionManagement.service.FictionService;
import com.ttn.fictionManagement.service.S3UploadFileService;
import com.ttn.fictionManagement.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FictionServiceImplement implements FictionService {
    private final FictionRepository fictionRepository;
    private final UserService userService;
    private final S3UploadFileService s3UploadFileService;
    private final ModelMapper modelMapper;

    @Autowired
    public FictionServiceImplement(FictionRepository fictionRepository, UserService userService, S3UploadFileService s3UploadFileService, ModelMapper modelMapper) {
        this.fictionRepository = fictionRepository;
        this.userService = userService;
        this.s3UploadFileService = s3UploadFileService;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<FictionUserDTO> findAll() {
        List<Fiction> fictions = fictionRepository.findAll(Sort.by(Sort.Direction.ASC, ("name")));
        List<FictionUserDTO> fictionUserDTOs = new ArrayList<>();

        for(Fiction fiction : fictions) {
            FictionUserDTO fictionUserDTO = modelMapper.map(fiction, FictionUserDTO.class);
            Optional<UserDTO> userDTO = userService.findById(Long.valueOf(fiction.getUserId()));
            fictionUserDTO.setUser(modelMapper.map(userDTO, UserDTO.class));
            fictionUserDTOs.add(fictionUserDTO);
        }

        return fictionUserDTOs;
    }

    @Override
    public Optional<FictionDTO> findById(long id) {
        Optional<Fiction> fiction = fictionRepository.findById(id);
        return fiction.map(fictionDto -> modelMapper.map(fictionDto, FictionDTO.class));
    }

    @Override
    public FictionDTO createOrUpdate(FictionDTO fictionDTO) {
        fictionRepository.save(modelMapper.map(fictionDTO, Fiction.class));
        return fictionDTO;
    }

    @Override
    public void deleteFiction(long id) {
        Optional<Fiction> fictionById = fictionRepository.findById(id);
        if (fictionById.isPresent()) {
            fictionById.map(fiction -> s3UploadFileService.deleteFile(fiction.getCoverUrl()));
        }
        fictionRepository.deleteById(id);
    }
}
