package com.shop.fashionmale.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class ProfileController {
    @PutMapping("/{id}/profile/")
    public ResponseEntity<?> profileCustomer(@PathVariable String id){
        return null;
    }
}
