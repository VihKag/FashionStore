package com.shop.fashionmale.repository;

import com.shop.fashionmale.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IWarehouseRepository extends JpaRepository<Warehouse,String> {
    Warehouse findWarehouseByWarehouseName(String warehouseName);
}
