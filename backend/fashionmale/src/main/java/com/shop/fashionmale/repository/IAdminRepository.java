package com.shop.fashionmale.repository;

import com.shop.fashionmale.model.Adminprofile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAdminRepository extends JpaRepository<Adminprofile, String> {
    void deleteById(String id);
}
