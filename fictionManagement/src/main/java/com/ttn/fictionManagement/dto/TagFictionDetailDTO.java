package com.ttn.fictionManagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TagFictionDetailDTO {
    private Integer id;
    private Integer fictionId;
    private Integer tagId;
    private TagDTO tag;
}
