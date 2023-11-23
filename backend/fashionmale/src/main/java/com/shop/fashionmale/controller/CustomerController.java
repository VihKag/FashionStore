package com.shop.fashionmale.controller;

import com.shop.fashionmale.model.Customerprofile;
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
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {
    @Autowired
    CustomerServiceImpl customerService;
    @GetMapping("/list")
    public ResponseEntity<?> pageCustomer(@PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable){
        Page<Customerprofile> customerPage = customerService.findAll(pageable);
        if(customerPage.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(customerPage, HttpStatus.OK);
    }
}
