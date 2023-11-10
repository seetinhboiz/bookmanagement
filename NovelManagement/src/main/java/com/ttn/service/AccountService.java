/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.ttn.service;

import com.ttn.pojo.Account;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Admin
 */
public interface AccountService {

    List<Account> getAccounts(Map<String, String> param);
}
