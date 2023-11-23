package com.shop.fashionmale.controller;

import com.shop.fashionmale.model.Warehouse;
import com.shop.fashionmale.repository.IWarehouseRepository;
import com.shop.fashionmale.service.IWarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/warehouse")
public class WarehouseController {
    @Autowired
    IWarehouseService warehouseService;
    @GetMapping()
    public ResponseEntity<List<Warehouse>> findAll(){
        List<Warehouse> list = warehouseService.findAll();
        if(list.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
