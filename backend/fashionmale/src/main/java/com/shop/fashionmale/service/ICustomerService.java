package com.shop.fashionmale.service;

import com.shop.fashionmale.model.Customerprofile;
import com.shop.fashionmale.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ICustomerService {
    void deleteById(String id);
    Optional<Customerprofile> findById(String id);
    Boolean existsByUser(Optional<User> user);
    Page<Customerprofile> findAll(Pageable pageable);
    Customerprofile save(Customerprofile customerprofile);
    Boolean existsById(String id);
}
