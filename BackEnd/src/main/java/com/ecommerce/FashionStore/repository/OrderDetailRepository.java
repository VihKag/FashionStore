package com.ecommerce.FashionStore.repository;

import com.ecommerce.FashionStore.entity.Orderdetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<Orderdetail, Integer> {
    List<Orderdetail> findByOrderId(Integer orderId);
}
