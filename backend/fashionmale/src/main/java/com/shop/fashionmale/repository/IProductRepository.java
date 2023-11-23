package com.shop.fashionmale.repository;

import com.shop.fashionmale.model.*;
import com.shop.fashionmale.request.ProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IProductRepository extends JpaRepository<Product, String> {
    List<Product> findProductByCategoryCategoryName(String category);
    @Query("select p from Product p where p.productName like %:search%")
    List<Product> searchProductByProductName(@Param("search") String search);
    Boolean existsProductByProductId(String id);
}
