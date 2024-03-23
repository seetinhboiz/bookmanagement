package com.ttn.fictionManagement.serviceImplement;

import com.ttn.fictionManagement.dto.ChapterDTO;
import com.ttn.fictionManagement.entity.Chapter;
import com.ttn.fictionManagement.repository.ChapterRepository;
import com.ttn.fictionManagement.service.ChapterService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChapterServiceImplement implements ChapterService {

    private final ChapterRepository chapterRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ChapterServiceImplement(ChapterRepository chapterRepository, ModelMapper modelMapper) {
        this.chapterRepository = chapterRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ChapterDTO> findAll() {
        List<Chapter> chapters = chapterRepository.findAll(Sort.by(Sort.Direction.ASC, ("sort")));
        return chapters.stream().map(chapter -> modelMapper.map(chapter, ChapterDTO.class)).collect(Collectors.toList());
    }

    @Override
    public Optional<ChapterDTO> findById(long id) {
        Optional<Chapter> chapter = chapterRepository.findById(id);
        return chapter.map(chapterDto -> modelMapper.map(chapterDto, ChapterDTO.class));
    }

    @Override
    public ChapterDTO createOrUpdate(ChapterDTO chapterDTO) {
        chapterRepository.save(modelMapper.map(chapterDTO, Chapter.class));
        return chapterDTO;
    }

    @Override
    public void deleteChapter(long id) {
        chapterRepository.deleteById(id);
    }

    @Override
    public List<ChapterDTO> findAllByFictionId(long id) {
        List<Chapter> chaptersByFictionId = chapterRepository.findAllByFictionId(id);
        return chaptersByFictionId.stream().map(chapter -> modelMapper.map(chapter, ChapterDTO.class)).collect(Collectors.toList());
    }

    @Override
    public int countChapterByFictionId(long fictionId) {
        return chapterRepository.countChapterByFictionId(fictionId);
    }
}
