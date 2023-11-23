package com.shop.fashionmale.repository;

import com.shop.fashionmale.model.Customerprofile;
import com.shop.fashionmale.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ICustomerRepository extends JpaRepository<Customerprofile, String> {
    void deleteById(String id);
    Boolean existsByUser(Optional<User> user);
}
