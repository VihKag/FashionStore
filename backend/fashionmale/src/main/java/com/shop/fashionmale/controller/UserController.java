package com.shop.fashionmale.controller;

import com.shop.fashionmale.model.Customerprofile;
import com.shop.fashionmale.model.User;
import com.shop.fashionmale.repository.ICustomerRepository;
import com.shop.fashionmale.repository.IUserRepository;
import com.shop.fashionmale.service.IAdminService;
import com.shop.fashionmale.service.ICustomerService;
import com.shop.fashionmale.service.Implement.UserServiceImpl;
import org.hibernate.ObjectDeletedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserServiceImpl userService;
    @Autowired
    ICustomerService customerService;
    @Autowired
    IAdminService adminService;

    @GetMapping("/list")
    public ResponseEntity<?> pageUser(@PageableDefault(sort = "username", direction = Sort.Direction.ASC)Pageable pageable){
        Page<User> userPage = userService.findAll(pageable);
        if(userPage.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(userPage, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id){
        Optional<User> user = userService.findById(id);
        if(user==null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchUserByUsername(@RequestParam String search){
        List<User> users = userService.searchUserByUsername(search);
        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @DeleteMapping("/customer/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id){
        try{
            customerService.deleteById(id);
            userService.deleteById(id);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        }catch (ObjectDeletedException e){
            throw e;
        }
    }

}
