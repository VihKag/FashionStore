package com.ecommerce.FashionStore.repository;

import com.ecommerce.FashionStore.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, String> {
    Warehouse findByName(String name);
}
