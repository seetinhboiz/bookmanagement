package com.ttn.fictionManagement.service;

import com.ttn.fictionManagement.dto.TagFictionDTO;

import java.util.List;
import java.util.Optional;

public interface TagFictionService {
    public List<TagFictionDTO> findAll();
    public Optional<TagFictionDTO> findById(Long id);
    public TagFictionDTO createOrUpdate(TagFictionDTO tagFiction);
    public void deleteTagFiction(long id);
    public List<Long> findAllByFictionId(long fictionId);
}
