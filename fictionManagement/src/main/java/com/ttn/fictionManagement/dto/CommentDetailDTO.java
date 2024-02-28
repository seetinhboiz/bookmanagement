package com.ttn.fictionManagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDetailDTO {
    private Integer id;
    private String content;
    private Integer fictionId;
    private Integer userId;
    private UserDTO user;
}
