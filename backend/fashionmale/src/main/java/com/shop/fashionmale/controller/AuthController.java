package com.shop.fashionmale.controller;

import com.shop.fashionmale.dto.request.SignInForm;
import com.shop.fashionmale.dto.request.SignUpForm;
import com.shop.fashionmale.dto.response.JwtResponse;
import com.shop.fashionmale.dto.response.ResponseMessage;
import com.shop.fashionmale.model.Role;
import com.shop.fashionmale.model.User;
import com.shop.fashionmale.security.jwt.JwtProvider;
import com.shop.fashionmale.security.userprintical.UserPrinciple;
import com.shop.fashionmale.service.Implement.RoleServiceImpl;
import com.shop.fashionmale.service.Implement.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import javax.validation.Valid;
import java.util.UUID;


@RequestMapping("api/auth")
@RestController
public class AuthController {
    @Autowired
    UserServiceImpl userService;
    @Autowired
    RoleServiceImpl roleService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtProvider jwtProvider;
    @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody SignUpForm signUpForm){
        if(userService.existsByEmail(signUpForm.getEmail())){
            return new ResponseEntity<>(new ResponseMessage("The username is existed"), HttpStatus.OK);
        }
        if(userService.existsByEmail(signUpForm.getEmail())){
            return new ResponseEntity<>(new ResponseMessage("The email is existed"), HttpStatus.OK);
        }

        Role userRole = null;
        String strRole = signUpForm.getRole();
        if (strRole != null){
            switch (strRole){
                case "admin":
                    userRole = roleService.findByName("admin").orElseThrow(() -> new RuntimeException("Role not found"));
                    break;
                case "manager":
                    userRole = roleService.findByName("manager").orElseThrow(() -> new RuntimeException("Role not found"));
                    break;
                case "warehouse":
                    userRole = roleService.findByName("warehouse").orElseThrow(() -> new RuntimeException("Role not found"));
                    break;
                case "staff":
                    userRole = roleService.findByName("staff").orElseThrow(() -> new RuntimeException("Role not found"));
                    break;
            }
        }else if(strRole == null){
            userRole = roleService.findByName("customer").orElseThrow(() -> new RuntimeException("Role not found"));
        }
        User user = new User(signUpForm.getUsername(), signUpForm.getEmail(), passwordEncoder.encode(signUpForm.getPassword()));
        user.setId(UUID.randomUUID().toString());
        user.setRole(userRole);

        userService.save(user);
        return new ResponseEntity<>(new ResponseMessage("create success!"), HttpStatus.OK);
    }
    @PostMapping("/signin")
    public ResponseEntity<?> login(@Valid @RequestBody SignInForm signInForm){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInForm.getUsername(), signInForm.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.createToken(authentication);
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
        return ResponseEntity.ok(new JwtResponse(token, userPrinciple.getUsername(), userPrinciple.getAuthorities()));
    }

}
