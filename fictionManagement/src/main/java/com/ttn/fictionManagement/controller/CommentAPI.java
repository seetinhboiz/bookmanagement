package com.ttn.fictionManagement.controller;

import com.ttn.fictionManagement.dto.CommentDTO;
import com.ttn.fictionManagement.service.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:4200/")
public class CommentAPI {

    private final CommentService commentService;
    private final Logger logger = LoggerFactory.getLogger(TagAPI.class);

    @Autowired
    public CommentAPI(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("")
    public ResponseEntity<List<CommentDTO>> getAllComments() {
        try {
            return new ResponseEntity<>(commentService.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            loggerException("getting", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<CommentDTO>> getById(@PathVariable long id) {
        try {
            return new ResponseEntity<>(commentService.findById(id), HttpStatus.OK);
        } catch (Exception e) {
            loggerException("getting", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<CommentDTO> createComment(@RequestBody CommentDTO commentDTO) {
        try {
            commentService.createOrUpdate(commentDTO);
            return new ResponseEntity<>(commentDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            loggerException("creating", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CommentDTO> updateComment(@RequestBody CommentDTO commentDTO, @PathVariable long id) {
        try {
            Optional<CommentDTO> commentById = commentService.findById(id);
            if (commentById.isPresent()) {
                commentService.createOrUpdate(commentDTO);
                return new ResponseEntity<>(commentDTO, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            loggerException("updating", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CommentDTO> deleteComment(@PathVariable long id) {
        try {
            Optional<CommentDTO> commentById = commentService.findById(id);
            if (commentById.isPresent()) {
                commentService.deleteComment(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            loggerException("deleting", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public void loggerException(String action, Exception e) {
        logger.error("Error occurred while " + action + " comment", e);
    }
}
