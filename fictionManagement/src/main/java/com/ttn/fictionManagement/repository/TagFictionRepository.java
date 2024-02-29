package com.ttn.fictionManagement.repository;

import com.ttn.fictionManagement.entity.TagFiction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagFictionRepository extends JpaRepository<TagFiction, Long> {
    @Query("select distinct tagFiction.tagId from TagFiction tagFiction where tagFiction.fictionId = ?1")
    public List<Long> findAllByFictionId(long id);
}
