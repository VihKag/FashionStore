package com.shop.fashionmale.service.Implement;

import com.shop.fashionmale.model.Role;
import com.shop.fashionmale.model.User;
import com.shop.fashionmale.repository.IRoleRepository;
import com.shop.fashionmale.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements IRoleService {
    @Autowired
    IRoleRepository roleRepository;
    @Override
    public Role findByName(String name) {
        return roleRepository.findByRoleName(name);
    }

    @Override
    public Role save(Role role) {
        return roleRepository.save(role);
    }

}
