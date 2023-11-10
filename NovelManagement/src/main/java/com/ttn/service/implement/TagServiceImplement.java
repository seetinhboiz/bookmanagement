/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ttn.service.implement;

import com.ttn.pojo.Tag;
import com.ttn.repository.TagRepository;
import com.ttn.service.TagService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Admin
 */
@Service
@Transactional
public class TagServiceImplement implements TagService {

    @Autowired
    private TagRepository tagRepository;

    @Override
    public List<Tag> getTags(Map<String, String> param) {
        return tagRepository.findAll();
    }

}
