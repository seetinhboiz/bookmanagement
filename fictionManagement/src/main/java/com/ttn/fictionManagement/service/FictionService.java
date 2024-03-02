package com.ttn.fictionManagement.service;

import com.ttn.fictionManagement.dto.FictionDTO;
import com.ttn.fictionManagement.dto.FictionDetailDTO;

import java.util.List;

public interface FictionService {
    public List<FictionDetailDTO> findAll();
    public FictionDetailDTO findById(long id);
    public FictionDTO createOrUpdate(FictionDTO fictionDTO);
    public void deleteFiction(long id);

}
