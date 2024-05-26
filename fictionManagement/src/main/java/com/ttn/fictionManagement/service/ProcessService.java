package com.ttn.fictionManagement.service;

import com.ttn.fictionManagement.dto.ProcessDTO;

public interface ProcessService {
    public ProcessDTO createOrUpdateProcess(ProcessDTO processDTO);
    public ProcessDTO getProcessByFictionIdAndUserId(int fictionId, int userId);
    public void deleteProcessByFictionId(int fictionId);
    public void deleteProcessByUserId(int userId);
}
