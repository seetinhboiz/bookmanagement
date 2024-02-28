package com.ttn.fictionManagement.repository;

import com.ttn.fictionManagement.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("select comment from Comment comment where comment.fictionId = ?1")
    public List<Comment> findAllCommentByFictionId(long fictionId);
}
