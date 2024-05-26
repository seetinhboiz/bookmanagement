package com.ttn.fictionManagement.service;

import com.ttn.fictionManagement.dto.FictionDTO;
import com.ttn.fictionManagement.dto.FictionDetailDTO;

import java.util.List;

public interface FictionService {
    public List<FictionDetailDTO> findAll();
    public List<FictionDetailDTO> findByFilter(Long tagId, String keyword);
    public FictionDetailDTO findById(long id, long currenUserId);
    public FictionDTO createOrUpdate(FictionDTO fictionDTO);
    public void deleteFiction(long id);
    public List<FictionDetailDTO> findAllByUserId(int id);
    public List<FictionDetailDTO> searchFiction(String keyword);

}
