package com.shop.fashionmale.controller;

import com.shop.fashionmale.model.User;
import com.shop.fashionmale.service.ICustomerService;
import com.shop.fashionmale.service.Implement.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserServiceImpl userService;
    @Autowired
    ICustomerService customerService;

    @GetMapping("/list")
    public ResponseEntity<?> pageUser(@PageableDefault(sort = "username", direction = Sort.Direction.ASC)Pageable pageable){
        Page<User> userPage = userService.findAll(pageable);
        if(userPage.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(userPage, HttpStatus.OK);
    }
//    @GetMapping("/customers")
//    public ResponseEntity<?> pageCustomer(@PageableDefault(sort = "id", direction = Sort.Direction.ASC)Pageable pageable){
//        Page<User> customerPage = userService.findUserByAdminprofileIsNull(pageable);
//        if(customerPage.isEmpty()){
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        return new ResponseEntity<>(customerPage, HttpStatus.OK);
//    }
//    @GetMapping("/staffs")
//    public ResponseEntity<?> pageStaffs(@PageableDefault(sort = "id", direction = Sort.Direction.ASC)Pageable pageable){
//        Page<User> staffsPage = userService.findUserByAdminprofileIsNotNull(pageable);
//        if(staffsPage.isEmpty()){
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        return new ResponseEntity<>(staffsPage, HttpStatus.OK);
//    }
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
}
