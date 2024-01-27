package com.ttn.fictionManagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChapterDTO {
    private Integer id;
    private String name;
    private String content;
    private Integer fictionId;
}
