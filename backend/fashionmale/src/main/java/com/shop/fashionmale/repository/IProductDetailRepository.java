package com.shop.fashionmale.repository;

import com.shop.fashionmale.model.Productdetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductDetailRepository extends JpaRepository<Productdetail, String> {
}
