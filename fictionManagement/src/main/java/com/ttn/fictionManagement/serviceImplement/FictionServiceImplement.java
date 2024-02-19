package com.ttn.fictionManagement.serviceImplement;

import com.ttn.fictionManagement.dto.FictionDTO;
import com.ttn.fictionManagement.entity.Fiction;
import com.ttn.fictionManagement.repository.FictionRepository;
import com.ttn.fictionManagement.service.FictionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FictionServiceImplement implements FictionService {
    private final FictionRepository fictionRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public FictionServiceImplement(FictionRepository fictionRepository, ModelMapper modelMapper) {
        this.fictionRepository = fictionRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<FictionDTO> findAll() {
        List<Fiction> fictions = fictionRepository.findAll(Sort.by(Sort.Direction.ASC, ("name")));
        return fictions.stream().map(fiction -> modelMapper.map(fiction, FictionDTO.class)).collect(Collectors.toList());
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
        fictionRepository.deleteById(id);
    }
}
