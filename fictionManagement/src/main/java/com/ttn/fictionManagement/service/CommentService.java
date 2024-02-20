package com.ttn.fictionManagement.service;

import com.ttn.fictionManagement.dto.CommentDTO;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    public List<CommentDTO> findAll();
    public Optional<CommentDTO> findById(Long id);
    public CommentDTO createOrUpdate(CommentDTO commentDTO);
    public void deleteComment(long id);
}
