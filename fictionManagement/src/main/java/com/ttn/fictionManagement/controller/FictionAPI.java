package com.ttn.fictionManagement.controller;

import com.ttn.fictionManagement.dto.FictionDTO;
import com.ttn.fictionManagement.dto.FictionDetailDTO;
import com.ttn.fictionManagement.service.FictionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fictions")
@CrossOrigin
public class FictionAPI {
    private final FictionService fictionService;
    private final Logger logger = LoggerFactory.getLogger(FictionAPI.class);

    @Autowired
    public FictionAPI(FictionService fictionService) {
        this.fictionService = fictionService;
    }

    @GetMapping("")
    public ResponseEntity<List<FictionDetailDTO>> getAllFictions() {
        try {
            return new ResponseEntity<>(fictionService.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            loggerException("getting", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<FictionDetailDTO> getById(@PathVariable long id) {
        try {
            return new ResponseEntity<>(fictionService.findById(id), HttpStatus.OK);
        } catch (Exception e) {
            loggerException("getting", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<FictionDTO> createFiction(@RequestBody FictionDTO fiction) {
        try {
            fictionService.createOrUpdate(fiction);
            return new ResponseEntity<>(fiction, HttpStatus.CREATED);
        } catch (Exception e) {
            loggerException("creating", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<FictionDTO> updateFiction(@RequestBody FictionDTO fiction, @PathVariable long id) {
        try {
            FictionDetailDTO fictionById = fictionService.findById(id);
            if (fictionById.getId() != null) {
                fictionService.createOrUpdate(fiction);
                return new ResponseEntity<>(fiction, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            loggerException("updating", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<FictionDTO> deleteFiction(@PathVariable long id) {
        try {
            FictionDetailDTO fictionById = fictionService.findById(id);
            if (fictionById.getId() != null) {
                fictionService.deleteFiction(id);
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
        logger.error("Error occurred while " + action + " fiction", e);
    }
}
