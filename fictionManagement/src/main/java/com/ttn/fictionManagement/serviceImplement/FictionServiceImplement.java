package com.ttn.fictionManagement.serviceImplement;

import com.ttn.fictionManagement.dto.*;
import com.ttn.fictionManagement.entity.Fiction;
import com.ttn.fictionManagement.repository.FictionRepository;
import com.ttn.fictionManagement.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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
        List<FictionDetailDTO> fictionDetailDTOS = new ArrayList<>();

        for (Fiction fiction : fictions) {
            FictionDetailDTO fictionDetailDTO = modelMapper.map(fiction, FictionDetailDTO.class);
            Optional<UserDTO> userDTO = userService.findById(Long.valueOf(fiction.getUserId()));
            fictionDetailDTO.setUser(modelMapper.map(userDTO, UserDTO.class));
            fictionDetailDTOS.add(fictionDetailDTO);
        }

        return fictionDetailDTOS;
    }

    @Override
    public FictionDetailDTO findById(long id) {
        Optional<Fiction> fictionOptional = fictionRepository.findById(id);
        FictionDetailDTO fictionDetailDTO = modelMapper.map(fictionOptional, FictionDetailDTO.class);

        Optional<UserDTO> userDTO = userService.findById(Long.valueOf(fictionDetailDTO.getUserId()));
        List<ChapterDTO> chapterDTOS = chapterService.findAllByFictionId(id);
        List<CommentDetailDTO> commentByFicitonIds = commentService.findAllByFictionId(id);

        List<Long> idTags = tagFictionService.findAllByFictionId(id);
        List<TagDTO> tagDTOS = new ArrayList<>();

        for (Long idTag : idTags) {
            TagDTO tagDTO = modelMapper.map(tagService.findById(idTag), TagDTO.class);
            tagDTOS.add(tagDTO);
        }

        fictionDetailDTO.setUser(modelMapper.map(userDTO, UserDTO.class));
        fictionDetailDTO.setChapters(chapterDTOS);
        fictionDetailDTO.setComments(commentByFicitonIds);
        fictionDetailDTO.setTags(tagDTOS);

        Fiction fiction = modelMapper.map(fictionOptional, Fiction.class);
        fiction.setCountView(fiction.getCountView() + 1);
        fictionRepository.save(fiction);

        fictionDetailDTO.setCountView(fictionDetailDTO.getCountView() + 1);

        return fictionDetailDTO;
    }

    @Override
    public FictionDTO createOrUpdate(FictionDTO fictionDTO) {
        fictionRepository.save(modelMapper.map(fictionDTO, Fiction.class));
        return fictionDTO;
    }

    @Override
    public void deleteFiction(long id) {
        Optional<Fiction> fictionById = fictionRepository.findById(id);
        if (fictionById.isPresent()) {
//            fictionById.map(fiction -> s3UploadFileService.deleteFile(fiction.getCoverUrl()));
        }
        fictionRepository.deleteById(id);
    }
}
