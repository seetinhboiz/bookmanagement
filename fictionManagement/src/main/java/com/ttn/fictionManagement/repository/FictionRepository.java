package com.ttn.fictionManagement.repository;

import com.ttn.fictionManagement.entity.Fiction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FictionRepository extends JpaRepository<Fiction, Long> {
}
