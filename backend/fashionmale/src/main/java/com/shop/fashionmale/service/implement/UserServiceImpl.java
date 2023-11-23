package com.shop.fashionmale.service.Implement;

import com.shop.fashionmale.model.Role;
import com.shop.fashionmale.model.User;
import com.shop.fashionmale.repository.IUserRepository;
import com.shop.fashionmale.service.IRoleService;
import com.shop.fashionmale.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service @Transactional
public class UserServiceImpl implements IUserService {
    @Autowired
    IUserRepository userRepository;
    @Autowired
    IRoleService roleService;
    @Override
    public List<User> searchUserByUsername(String search) {
        return userRepository.searchUserByUsername(search);
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public void deleteById(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public void addRole(String username, String roleName) {
        User user = userRepository.findUserByUsername(username).get();
        Role role = roleService.findByName(roleName);
        user.getRoles().add(role);
    }
}
