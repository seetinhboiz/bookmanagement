package com.ttn.fictionManagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "process")
public class Process {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "fiction_id")
    private Integer fictionId;

    @Column(name = "chapter_process_id")
    private Integer chapterProcessId;
}
