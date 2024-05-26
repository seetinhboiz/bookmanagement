package com.ttn.fictionManagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProcessDTO {
    private Integer id;
    private Integer userId;
    private Integer fictionId;
    private Integer chapterProcessId;
}
