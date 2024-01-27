package com.ttn.fictionManagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tag_fiction")
public class TagFiction {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "tagId")
    private Integer tagId;

    @Column(name = "fictionId")
    private Integer fictionId;
}
