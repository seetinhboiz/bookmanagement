package com.ttn.fictionManagement.serviceImplement;

import com.ttn.fictionManagement.dto.ProcessDTO;
import com.ttn.fictionManagement.entity.Process;
import com.ttn.fictionManagement.repository.ProcessRepository;
import com.ttn.fictionManagement.service.ProcessService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProcessServiceImplement implements ProcessService {
    private final ProcessRepository processRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ProcessServiceImplement(ProcessRepository processRepository, ModelMapper modelMapper) {
        this.processRepository = processRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ProcessDTO createOrUpdateProcess(ProcessDTO processDTO) {
        processRepository.save(modelMapper.map(processDTO, Process.class));
        return modelMapper.map(processRepository.findProcessByFictionIdAndUserId(processDTO.getFictionId(), processDTO.getUserId()), ProcessDTO.class);
    }

    @Override
    public ProcessDTO getProcessByFictionIdAndUserId(int fictionId, int userId) {
        Process process = processRepository.findProcessByFictionIdAndUserId(fictionId, userId);
        if (process == null) {
            return null;
        }
        return modelMapper.map(process, ProcessDTO.class);
    }

    @Override
    public void deleteProcessByFictionId(int fictionId) {
    }

    @Override
    public void deleteProcessByUserId(int userId) {
    }
}
