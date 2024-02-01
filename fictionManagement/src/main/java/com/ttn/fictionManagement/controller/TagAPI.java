package com.ttn.fictionManagement.controller;

import com.ttn.fictionManagement.dto.TagDTO;
import com.ttn.fictionManagement.service.TagService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tags")
public class TagAPI {
//    private final TagServiceImplement tagServiceImplement;
    private final TagService tagService;
    private final Logger logger = LoggerFactory.getLogger(TagAPI.class);

    @Autowired
    public TagAPI(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping("")
    public ResponseEntity<List<TagDTO>> getAllTags() {
        try {
            return new ResponseEntity<>(tagService.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred while getting all tags", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<TagDTO>> getById(@PathVariable long id) {
        try {
            return new ResponseEntity<>(tagService.findById(id), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred while getting tag by Id" + id, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<TagDTO> createTag(@RequestBody TagDTO tag) {
        try {
            TagDTO createdTag = tagService.createOrUpdate(tag);
            return new ResponseEntity<>(createdTag, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error occurred while creating tag", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<TagDTO> updateTag(@RequestBody TagDTO tag, @PathVariable long id) {
        try {
            Optional<TagDTO> tagById = tagService.findById(id);
            if (tagById.isPresent()) {
                tagService.createOrUpdate(tag);
                return new ResponseEntity<>(tag, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("Error occurred while updating tag", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<TagDTO> deleteTag(@PathVariable long id) {
        try {
            Optional<TagDTO> tagById = tagService.findById(id);
            if (tagById.isPresent()) {
                tagService.deleteTag(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error("Error occurred while deleting tag", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
