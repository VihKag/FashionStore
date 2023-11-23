package com.shop.fashionmale.repository;

import com.shop.fashionmale.model.Price;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPriceRepository extends JpaRepository<Price, Long> {
    
}
