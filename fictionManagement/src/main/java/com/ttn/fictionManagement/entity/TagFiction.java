package com.ttn.fictionManagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tag_fiction")
public class TagFiction {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "tagId")
    private Integer tagId;

    @Column(name = "fictionId")
    private Integer fictionId;
}
