package com.ttn.fictionManagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(name = "avatarURL")
    private String avatarUrl;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private String role;
}
