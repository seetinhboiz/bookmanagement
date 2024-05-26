package com.ttn.fictionManagement.repository;

import com.ttn.fictionManagement.entity.Process;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcessRepository extends JpaRepository<Process, Long> {
    @Query("select process from Process process where process.fictionId = ?1 and process.userId = ?2")
    public Process findProcessByFictionIdAndUserId(int fictionId, int userId);
}
