package com.ttn.fictionManagement.repository;

import com.ttn.fictionManagement.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    @Query("select chapter from Chapter chapter where chapter.fictionId = ?1")
    List<Chapter> findAllByFictionId(long fictionId);
}
