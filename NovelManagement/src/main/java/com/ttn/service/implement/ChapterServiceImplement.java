/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ttn.service.implement;

import com.ttn.pojo.Chapter;
import com.ttn.repository.ChapterRepository;
import com.ttn.service.ChapterService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Admin
 */
@Service
@Transactional

public class ChapterServiceImplement implements ChapterService{
    @Autowired
    private ChapterRepository chapterRepository; 

    @Override
    public List<Chapter> getChapters() {
        return chapterRepository.findAll();
    }
    
}
