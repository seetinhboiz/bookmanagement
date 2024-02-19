package com.ttn.fictionManagement.service;

import com.ttn.fictionManagement.dto.FictionDTO;

import java.util.List;
import java.util.Optional;

public interface FictionService {
    public List<FictionDTO> findAll();
    public Optional<FictionDTO> findById(long id);
    public FictionDTO createOrUpdate(FictionDTO fictionDTO);
    public void deleteFiction(long id);

}
