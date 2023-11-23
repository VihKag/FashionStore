package com.shop.fashionmale.controller;

import com.shop.fashionmale.service.Implement.CustomerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {
    @Autowired
    CustomerServiceImpl customerService;
    @GetMapping("/customers")
    public ResponseEntity<?> getCustomerProfile(@PageableDefault(sort = "user_id", direction = Sort.Direction.ASC) Pageable pageable){
        Page profile = customerService.findAll(pageable);
        if(profile.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }
}
