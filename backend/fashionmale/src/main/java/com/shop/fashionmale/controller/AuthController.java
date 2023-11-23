package com.shop.fashionmale.controller;

import com.shop.fashionmale.request.SignInRequest;
import com.shop.fashionmale.request.SignUpRequest;
import com.shop.fashionmale.response.JwtResponse;
import com.shop.fashionmale.response.ResponseMessage;
import com.shop.fashionmale.model.Role;
import com.shop.fashionmale.model.User;
import com.shop.fashionmale.security.jwt.JwtProvider;
import com.shop.fashionmale.security.jwt.JwtTokenFilter;
import com.shop.fashionmale.security.usercustome.UserPrincipal;
import com.shop.fashionmale.service.Implement.CustomerServiceImpl;
import com.shop.fashionmale.service.Implement.RoleServiceImpl;
import com.shop.fashionmale.service.Implement.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@RequestMapping("api/auth")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
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
    CustomerServiceImpl customerService;
    @Autowired
    JwtProvider jwtProvider;
    @Autowired
    JwtTokenFilter jwtTokenFilter;
    @PostMapping("/signup")
    public ResponseEntity<?> register(@Valid @RequestBody SignUpRequest signUpRequest){
        if(userService.existsByEmail(signUpRequest.getEmail())){
            return new ResponseEntity<>(new ResponseMessage("The username is existed"), HttpStatus.OK);
        }
        if(userService.existsByEmail(signUpRequest.getEmail())){
            return new ResponseEntity<>(new ResponseMessage("The email is existed"), HttpStatus.OK);
        }
        User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(), passwordEncoder.encode(signUpRequest.getPassword()));
        user.setId(UUID.randomUUID().toString());
        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();
        if(strRoles!=null){
            strRoles.forEach(role->{
                Role role1 = roleService.findByName(role);
                roles.add(role1);
            });
        }
        user.setRoles(roles);
        userService.save(user);
        return new ResponseEntity<>(new ResponseMessage("create success!"), HttpStatus.OK);
    }
    @PostMapping("/signin")
    public ResponseEntity<?> login(@Valid @RequestBody SignInRequest signInRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.createToken(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok(new JwtResponse(token, userPrincipal.getUsername(), userPrincipal.getAuthorities()));
    }
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(HttpServletRequest request,@Valid @RequestBody SignInRequest changePassForm){
        String jwt = jwtTokenFilter.getJwt(request);
        String username = jwtProvider.getUserNameFromToken(jwt);
        User user = userService.findUserByUsername(username).orElseThrow(()-> new UsernameNotFoundException("Username or password not found"));
        try{
            user.setPassword(passwordEncoder.encode(changePassForm.getPassword()));
            userService.save(user);
            return new ResponseEntity<>(new ResponseMessage("Change password success!!!"),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(new ResponseMessage(e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

}
