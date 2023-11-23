package com.shop.fashionmale.service;

import com.shop.fashionmale.model.Role;

import java.util.Optional;

public interface IRoleService {
    Role findByName(String name);
    Role save(Role role);
}
