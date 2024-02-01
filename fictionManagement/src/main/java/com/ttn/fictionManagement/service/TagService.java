package com.ttn.fictionManagement.service;

import com.ttn.fictionManagement.dto.TagDTO;

import java.util.List;
import java.util.Optional;

public interface TagService {
    public List<TagDTO> findAll();
    public Optional<TagDTO> findById(Long id);
    public TagDTO createOrUpdate(TagDTO tag);
    public void deleteTag(long id);
}
