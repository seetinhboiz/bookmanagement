/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ttn.service.implement;

import com.ttn.pojo.BookTag;
import com.ttn.repository.BookTagRepository;
import com.ttn.service.BookTagService;
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

public class BookTagServiceImplement implements BookTagService {

    @Autowired
    private BookTagRepository bookTagRepository;

    @Override
    public List<BookTag> getBookTag() {
        return bookTagRepository.findAll();
    }

}
