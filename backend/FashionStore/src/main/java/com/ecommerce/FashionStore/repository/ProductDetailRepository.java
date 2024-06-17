package com.ecommerce.FashionStore.repository;

import com.ecommerce.FashionStore.entity.Productdetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDetailRepository extends JpaRepository<Productdetail,String> {
    List<Productdetail> findByProductId(String productId);
    Optional<Productdetail> findByProductIdAndColorIdAndSizeId(String productId, Integer colorId, Integer sizeId);
}
