package com.shop.fashionmale.service;

import com.shop.fashionmale.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    void deleteById(String id);
    List<User> searchUserByUsername(String search);
    Optional<User> findUserByUsername(String username);
    Optional<User> findById(String id);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    User save(User user);
    Page<User> findAll(Pageable pageable);
}
