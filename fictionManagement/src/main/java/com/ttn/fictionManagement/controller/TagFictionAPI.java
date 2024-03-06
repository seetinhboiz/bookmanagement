package com.ttn.fictionManagement.controller;

import com.ttn.fictionManagement.dto.TagFictionDTO;
import com.ttn.fictionManagement.service.TagFictionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tagFicitons")
@CrossOrigin
public class TagFictionAPI {

    private final TagFictionService tagFictionService;
    private final Logger logger = LoggerFactory.getLogger(TagAPI.class);

    @Autowired
    public TagFictionAPI(TagFictionService tagFictionService) {
        this.tagFictionService = tagFictionService;
    }

    @GetMapping("")
    public ResponseEntity<List<TagFictionDTO>> getAllTagFictions() {
        try {
            return new ResponseEntity<>(tagFictionService.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            loggerException("getting", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<TagFictionDTO>> getById(@PathVariable long id) {
        try {
            return new ResponseEntity<>(tagFictionService.findById(id), HttpStatus.OK);
        } catch (Exception e) {
            loggerException("getting", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<TagFictionDTO> createTagFiction(@RequestBody TagFictionDTO tagFiction) {
        try {
            tagFictionService.createOrUpdate(tagFiction);
            return new ResponseEntity<>(tagFiction, HttpStatus.CREATED);
        } catch (Exception e) {
            loggerException("creating", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TagFictionDTO> updateTagFiction(@RequestBody TagFictionDTO tagFiction, @PathVariable long id) {
        try {
            Optional<TagFictionDTO> tagById = tagFictionService.findById(id);
            if (tagById.isPresent()) {
                tagFictionService.createOrUpdate(tagFiction);
                return new ResponseEntity<>(tagFiction, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            loggerException("updating", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<TagFictionDTO> deleteTagFiction(@PathVariable long id) {
        try {
            Optional<TagFictionDTO> tagById = tagFictionService.findById(id);
            if (tagById.isPresent()) {
                tagFictionService.deleteTagFiction(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            loggerException("deleting", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{fictionId}/{tagId}")
    public ResponseEntity<TagFictionDTO> deleteByFictionIdTagId(@PathVariable long fictionId, @PathVariable long tagId) {
        try {
            tagFictionService.deleteByFictionIdTagId(fictionId, tagId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            loggerException("deleting", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public void loggerException(String action, Exception e) {
        logger.error("Error occurred while " + action + " tag-fiction", e);
    }
}
