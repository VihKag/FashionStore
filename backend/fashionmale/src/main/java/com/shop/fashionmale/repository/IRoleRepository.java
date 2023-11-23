package com.shop.fashionmale.repository;

import com.shop.fashionmale.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {
    Role findByRoleName(String name);
}
