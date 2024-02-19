package com.ttn.fictionManagement.serviceImplement;

import com.ttn.fictionManagement.dto.TagDTO;
import com.ttn.fictionManagement.entity.Tag;
import com.ttn.fictionManagement.repository.TagRepository;
import com.ttn.fictionManagement.service.TagService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TagServiceImplement implements TagService {
    private final ModelMapper modelMapper;
    private final TagRepository tagRepository;

    @Autowired
    public TagServiceImplement(TagRepository tagRepository, ModelMapper modelMapper) {
        this.tagRepository = tagRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<TagDTO> findAll() {
        List<Tag> tags = tagRepository.findAll(Sort.by(Sort.Direction.ASC, ("name")));
        return tags.stream().map(tag -> modelMapper.map(tag, TagDTO.class)).collect(Collectors.toList());
    }

    @Override
    public Optional<TagDTO> findById(Long id) {
        Optional<Tag> tagOptional = tagRepository.findById(id);
        return tagOptional.map(tag -> modelMapper.map(tag, TagDTO.class));
    }

    @Override
    public TagDTO createOrUpdate(TagDTO tagDTO) {
        tagRepository.save(modelMapper.map(tagDTO, Tag.class));
        return tagDTO;
    }

    @Override
    public void deleteTag(long id) {
        tagRepository.deleteById(id);
    }
}
