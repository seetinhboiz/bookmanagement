package com.ttn.fictionManagement.repository;

import com.ttn.fictionManagement.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    @Query("select chapter from Chapter chapter where chapter.fictionId = ?1 order by chapter.sort asc")
    List<Chapter> findAllByFictionId(long fictionId);

    @Query("select count(chapter.id) from Chapter chapter where chapter.fictionId = ?1")
    int countChapterByFictionId(long fictionId);
}
