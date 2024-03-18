package com.ttn.fictionManagement.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FictionDetailDTO {
    private Integer id;
    private String name;
    private Integer countView;
    private String coverUrl;
    private Byte status;
    private String description;
    private Integer userId;
    private UserDTO user;
    private List<ChapterDTO> chapters;
    private List<CommentDetailDTO> comments;
    private List<TagDTO> tags;
    private String coverPublicId;
}
