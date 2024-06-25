package com.ttn.fictionManagement.controller;

import com.ttn.fictionManagement.dto.ProcessDTO;
import com.ttn.fictionManagement.repository.ProcessRepository;
import com.ttn.fictionManagement.service.ProcessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/api/process")
public class ProcessAPI {
    private final ProcessService processService;

    @Autowired
    public ProcessAPI(ProcessService processService) {
        this.processService = processService;
    }

    @PostMapping("/create")
    public ResponseEntity<ProcessDTO> createProcess(@RequestBody ProcessDTO processDTO) {
        return new ResponseEntity<>(this.processService.createOrUpdateProcess(processDTO), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<ProcessDTO> updateProcess(@RequestBody ProcessDTO processDTO) {
        return new ResponseEntity<>(this.processService.createOrUpdateProcess(processDTO), HttpStatus.OK);
    }

    @GetMapping("/{fictionId}/{userId}")
    public ResponseEntity<ProcessDTO> getProcessByFictionIdAndUserId(@PathVariable int fictionId, @PathVariable int userId) {
        return new ResponseEntity<>(this.processService.getProcessByFictionIdAndUserId(fictionId, userId), HttpStatus.OK);
    }
}
