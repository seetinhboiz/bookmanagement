package com.ttn.fictionManagement.controller;

import com.ttn.fictionManagement.dto.ChapterDTO;
import com.ttn.fictionManagement.service.ChapterService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/chapters")
@CrossOrigin
public class ChapterAPI {

    private final ChapterService chapterService;
    private final Logger logger = LoggerFactory.getLogger(ChapterAPI.class);

    @Autowired
    public ChapterAPI(ChapterService chapterService) {
        this.chapterService = chapterService;
    }

    @GetMapping("")
    public ResponseEntity<List<ChapterDTO>> getAllChapters() {
        try {
            return new ResponseEntity<>(chapterService.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            loggerException("getting", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ChapterDTO>> getById(@PathVariable long id) {
        try {
            return new ResponseEntity<>(chapterService.findById(id), HttpStatus.OK);
        } catch (Exception e) {
            loggerException("getting", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ChapterDTO> createChapter(@RequestBody ChapterDTO chapter) {
        try {
            chapterService.createOrUpdate(chapter);
            return new ResponseEntity<>(chapter, HttpStatus.CREATED);
        } catch (Exception e) {
            loggerException("creating", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ChapterDTO> updateChapter(@RequestBody ChapterDTO chapter, @PathVariable long id) {
        try {
            Optional<ChapterDTO> chapterById = chapterService.findById(id);
            if (chapterById.isPresent()) {
                chapterService.createOrUpdate(chapter);
                return new ResponseEntity<>(chapter, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            loggerException("updating", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ChapterDTO> deleteChapter(@PathVariable long id) {
        try {
            Optional<ChapterDTO> chapterById = chapterService.findById(id);
            if (chapterById.isPresent()) {
                chapterService.deleteChapter(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            loggerException("deleting", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{fictionId}/chapters")
    public ResponseEntity<List<ChapterDTO>> getAllByFictionId(@PathVariable long fictionId) {
        return new ResponseEntity<>(chapterService.findAllByFictionId(fictionId), HttpStatus.OK);
    }

    public void loggerException(String action, Exception e) {
        logger.error("Error occurred while " + action + " chapter", e);
    }
}
