package com.ttn.fictionManagement.serviceImplement;

import com.ttn.fictionManagement.dto.TagFictionDTO;
import com.ttn.fictionManagement.entity.TagFiction;
import com.ttn.fictionManagement.repository.TagFictionRepository;
import com.ttn.fictionManagement.service.TagFictionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TagFictionServiceImplement implements TagFictionService {

    private final TagFictionRepository tagFictionRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TagFictionServiceImplement(ModelMapper modelMapper, TagFictionRepository fictionRepository) {
        this.tagFictionRepository = fictionRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<TagFictionDTO> findAll() {
        List<TagFiction> tagFictions = tagFictionRepository.findAll();
        return tagFictions.stream().map(tagFiction -> modelMapper.map(tagFiction, TagFictionDTO.class)).collect(Collectors.toList());
    }

    @Override
    public Optional<TagFictionDTO> findById(Long id) {
        Optional<TagFiction> tagFictionOptional = tagFictionRepository.findById(id);
        return tagFictionOptional.map(tagFiction -> modelMapper.map(tagFiction, TagFictionDTO.class));
    }

    @Override
    public TagFictionDTO createOrUpdate(TagFictionDTO tagFiction) {
        tagFictionRepository.save(modelMapper.map(tagFiction, TagFiction.class));
        return tagFiction;
    }

    @Override
    public void deleteTagFiction(long id) {
        tagFictionRepository.deleteById(id);
    }

    @Override
    public List<Long> findAllByFictionId(long fictionId) {
        return tagFictionRepository.findAllByFictionId(fictionId);
    }

    @Override
    public List<Long> findAllByTagId(long tagId) {
        return tagFictionRepository.findAllByTagId(tagId);
    }

    @Override
    public void deleteByFictionIdTagId(long fictionId, long tagId) {
        tagFictionRepository.deleteByFictionIdTagId(fictionId, tagId);
    }
}
