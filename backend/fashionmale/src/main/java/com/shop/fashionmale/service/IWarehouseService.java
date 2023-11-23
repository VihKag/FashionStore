package com.shop.fashionmale.service;

import com.shop.fashionmale.model.Warehouse;

import java.util.List;
import java.util.Optional;

public interface IWarehouseService {
    void deleteById(String id);
    List<Warehouse> findAll();
    Warehouse findWarehouseByWarehouseName(String warehouseName);
}
