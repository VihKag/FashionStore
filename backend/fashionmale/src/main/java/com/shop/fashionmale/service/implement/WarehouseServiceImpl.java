package com.shop.fashionmale.service.Implement;

import com.shop.fashionmale.model.Warehouse;
import com.shop.fashionmale.repository.IWarehouseRepository;
import com.shop.fashionmale.service.IWarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WarehouseServiceImpl implements IWarehouseService {
    @Autowired
    IWarehouseRepository warehouseRepository;
    public Optional<Warehouse> findById(String id){
        return warehouseRepository.findById(id);
    }
    public void deleteById(String id){
        warehouseRepository.deleteById(id);
    }
    public List<Warehouse> findAll(){
        return warehouseRepository.findAll();
    }

    @Override
    public Warehouse findWarehouseByWarehouseName(String warehouseName) {
        return warehouseRepository.findWarehouseByWarehouseName(warehouseName);
    }
}
