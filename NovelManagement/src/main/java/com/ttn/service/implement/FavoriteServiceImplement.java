/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ttn.service.implement;

import com.ttn.pojo.Favorite;
import com.ttn.repository.FavoriteRepository;
import com.ttn.service.FavoriteService;
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

public class FavoriteServiceImplement implements FavoriteService{
    @Autowired
    private FavoriteRepository favoriteRepository;

    @Override
    public List<Favorite> getFavorite() {
        return favoriteRepository.findAll();
    }
    
}
