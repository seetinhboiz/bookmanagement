package com.ttn.fictionManagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FictionDTO {
    private Integer id;
    private String name;
    private Integer countView;
    private String coverUrl;
    private Byte status;
    private String description;
    private Integer userId;
}
