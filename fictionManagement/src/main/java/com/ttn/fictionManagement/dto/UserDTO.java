package com.ttn.fictionManagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private Integer id;
    private String username;
    private String avatarUrl;
    private String password;
    private String role;
    private String avatarPublicId;
}
