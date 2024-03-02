package com.ttn.fictionManagement.serviceImplement;

import com.ttn.fictionManagement.dto.CommentDTO;
import com.ttn.fictionManagement.dto.CommentDetailDTO;
import com.ttn.fictionManagement.dto.UserDTO;
import com.ttn.fictionManagement.entity.Comment;
import com.ttn.fictionManagement.repository.CommentRepository;
import com.ttn.fictionManagement.service.CommentService;
import com.ttn.fictionManagement.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentServiceImplement implements CommentService {

    private final CommentRepository commentRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;

    @Autowired
    public CommentServiceImplement(CommentRepository commentRepository, UserService userService, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<CommentDTO> findAll() {
        List<Comment> comments = commentRepository.findAll();
        return comments.stream().map(comment -> modelMapper.map(comment, CommentDTO.class)).collect(Collectors.toList());
    }

    @Override
    public Optional<CommentDTO> findById(Long id) {
        Optional<Comment> commnetOptional = commentRepository.findById(id);
        return commnetOptional.map(comment -> modelMapper.map(comment, CommentDTO.class));
    }

    @Override
    public CommentDTO createOrUpdate(CommentDTO commentDTO) {
        commentRepository.save(modelMapper.map(commentDTO, Comment.class));
        return commentDTO;
    }

    @Override
    public void deleteComment(long id) {
        commentRepository.deleteById(id);
    }

    @Override
    public List<CommentDetailDTO> findAllByFictionId(Long fictionId) {
        List<Comment> comments = commentRepository.findAllCommentByFictionId(fictionId);
        List<CommentDetailDTO> commentByFictionIds = new ArrayList<>();

        for (Comment comment : comments) {
            CommentDetailDTO commentByFictionId = modelMapper.map(comment, CommentDetailDTO.class);
            UserDTO userById = modelMapper.map(userService.findById(Long.valueOf(comment.getUserId())), UserDTO.class);
            commentByFictionId.setUser(userById);
            commentByFictionIds.add(commentByFictionId);
        }
        return commentByFictionIds;
    }
}
