package com.ttn.fictionManagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO {
    private Integer id;
    private String content;
    private Integer chapterId;
    private Integer userId;
}
