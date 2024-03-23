package com.ttn.fictionManagement.service;

import com.ttn.fictionManagement.dto.ChapterDTO;

import java.util.List;
import java.util.Optional;

public interface ChapterService {
    public List<ChapterDTO> findAll();
    public Optional<ChapterDTO> findById(long id);
    public ChapterDTO createOrUpdate(ChapterDTO chapterDTO);
    public void deleteChapter(long id);
    public List<ChapterDTO> findAllByFictionId(long id);
    public int countChapterByFictionId(long fictionId);
}
