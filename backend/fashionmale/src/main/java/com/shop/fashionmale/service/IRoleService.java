package com.shop.fashionmale.service;

import com.shop.fashionmale.model.Role;

import java.util.Optional;

public interface IRoleService {
    Optional<Role> findByName(String name);
}
