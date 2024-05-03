package com.ttn.fictionManagement.repository;

import com.ttn.fictionManagement.entity.Fiction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FictionRepository extends JpaRepository<Fiction, Long> {
    @Query("select fiction from Fiction fiction where fiction.userId = ?1")
    public List<Fiction> getFictionsByUserId(int id);

    @Query("select  fiction from  Fiction fiction where  fiction.name like %?1%")
    public List<Fiction> searchFiction(String keyword);
}
