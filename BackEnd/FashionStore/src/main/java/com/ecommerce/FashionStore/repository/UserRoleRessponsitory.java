package com.ecommerce.FashionStore.repository;

import com.ecommerce.FashionStore.entity.Userrole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRessponsitory extends JpaRepository<Userrole, Integer> {
    void deleteUserrolesByUser_Id(String id);
}
