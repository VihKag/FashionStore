package com.shop.fashionmale.repository;

import com.shop.fashionmale.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISizeRepository extends JpaRepository<Size,Integer> {
    Size findSizeBySizeName (String sizeName);
}
