package com.ttn.fictionManagement.serviceImplement;

import com.ttn.fictionManagement.dto.*;
import com.ttn.fictionManagement.entity.Fiction;
import com.ttn.fictionManagement.repository.FictionRepository;
import com.ttn.fictionManagement.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FictionServiceImplement implements FictionService {
    private final FictionRepository fictionRepository;
    private final UserService userService;
    private final ChapterService chapterService;
    private final CommentService commentService;
    private final TagFictionService tagFictionService;
    private final TagService tagService;
    private final FileUploadService fileUploadService;
    private final ModelMapper modelMapper;

    @Autowired
    public FictionServiceImplement(FictionRepository fictionRepository,
                                   UserService userService,
                                   ChapterService chapterService,
                                   CommentService commentService,
                                   TagFictionService tagFictionService,
                                   TagService tagService,
                                   FileUploadService fileUploadService,
                                   ModelMapper modelMapper) {
        this.fictionRepository = fictionRepository;
        this.userService = userService;
        this.chapterService = chapterService;
        this.commentService = commentService;
        this.tagFictionService = tagFictionService;
        this.tagService = tagService;
        this.fileUploadService = fileUploadService;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<FictionDetailDTO> findAll() {
        List<Fiction> fictions = fictionRepository.findAll(Sort.by(Sort.Direction.ASC, ("name")));

        return modelMapListFictionDetailDTO(fictions);
    }

    @Override
    public FictionDetailDTO findById(long id) {
        Optional<Fiction> fictionOptional = fictionRepository.findById(id);
        FictionDetailDTO fictionDetailDTO = modelMapper.map(fictionOptional, FictionDetailDTO.class);

        UserDTO userDTO = findUser(fictionDetailDTO.getUserId());

        List<ChapterDTO> chapterDTOs = findAllChapterByFictionId(id);
        List<CommentDetailDTO> commentDetailDTOs = findAllCommentByFictionId(id);
        List<TagDTO> tagDTOs = findAllTagByFictionId(id);

        fictionDetailDTO.setUser(modelMapper.map(userDTO, UserDTO.class));
        fictionDetailDTO.setChapters(chapterDTOs);
        fictionDetailDTO.setComments(commentDetailDTOs);
        fictionDetailDTO.setTags(tagDTOs);

        Fiction fiction = modelMapper.map(fictionOptional, Fiction.class);
        saveCountView(fiction);

        fictionDetailDTO.setCountView(fictionDetailDTO.getCountView() + 1);

        return fictionDetailDTO;
    }

    public void saveCountView(Fiction fiction) {
        fiction.setCountView(fiction.getCountView() + 1);
        fictionRepository.save(fiction);
    }

    @Override
    public FictionDTO createOrUpdate(FictionDTO fictionDTO) {
        fictionRepository.save(modelMapper.map(fictionDTO, Fiction.class));
        return fictionDTO;
    }

    @Override
    public void deleteFiction(long id) {
        Fiction fictionById = modelMapper.map(fictionRepository.findById(id), Fiction.class);
        if (isFictionPresent(fictionById)) {
            deleteCover(fictionById.getCoverPublicId());
            fictionRepository.deleteById(id);
        }
    }

    public List<FictionDetailDTO> modelMapListFictionDetailDTO(List<Fiction> fictions) {
        List<FictionDetailDTO> fictionDetailDTOS = new ArrayList<>();

        for (Fiction fiction : fictions) {
            FictionDetailDTO fictionDetailDTO = modelMapFictionDetailDTO(fiction);
            UserDTO userDTO = findUser(fiction.getUserId());

            fictionDetailDTO.setUser(modelMapper.map(userDTO, UserDTO.class));
            fictionDetailDTOS.add(fictionDetailDTO);
        }

        return fictionDetailDTOS;
    }

    public FictionDetailDTO modelMapFictionDetailDTO(Fiction fiction) {
        return modelMapper.map(fiction, FictionDetailDTO.class);
    }

    public UserDTO findUser(long id) {
        return userService.findById(id);
    }

    public boolean isFictionPresent(Fiction fiction) {
        return fiction != null;
    }

    public void deleteCover(String publicId) {
        try {
            fileUploadService.deleteFile(publicId);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<ChapterDTO> findAllChapterByFictionId(long fictionId) {
        return chapterService.findAllByFictionId(fictionId);
    }

    public List<CommentDetailDTO> findAllCommentByFictionId(long fictionId) {
        return commentService.findAllByFictionId(fictionId);
    }

    public List<TagDTO> findAllTagByFictionId(long fictionId) {
        List<Long> idTags = tagFictionService.findAllByFictionId(fictionId);
        List<TagDTO> tagDTOS = new ArrayList<>();

        for (Long idTag : idTags) {
            TagDTO tagDTO = modelMapper.map(tagService.findById(idTag), TagDTO.class);
            tagDTOS.add(tagDTO);
        }

        return tagDTOS;
    }
}
