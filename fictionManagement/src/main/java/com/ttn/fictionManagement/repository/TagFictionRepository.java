package com.ttn.fictionManagement.repository;

import com.ttn.fictionManagement.entity.TagFiction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagFictionRepository extends JpaRepository<TagFiction, Long> {
}
