package com.ecommerce.FashionStore.controller;

import com.ecommerce.FashionStore.dto.UserDto;
import com.ecommerce.FashionStore.entity.User;
import com.ecommerce.FashionStore.mapper.UserMapper;
import com.ecommerce.FashionStore.repository.UserRepository;
import com.ecommerce.FashionStore.service.impl.UserServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    private final UserServiceImpl userService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final UserServiceImpl userServiceImpl;

    public UserController(UserServiceImpl userService, UserRepository userRepository, UserMapper userMapper, UserServiceImpl userServiceImpl) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.userServiceImpl = userServiceImpl;
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody UserDto userDto) {
        User user = userMapper.convertToUser(userDto);
        User savedUser = userRepository.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable String id, @ModelAttribute UserDto userDto) throws IOException {
        try {
            User updatedUser = userService.updateUser(id, userDto);
            UserDto updatedUserDto = userMapper.convertToUserDto(updatedUser);
            return ResponseEntity.ok(updatedUserDto);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/email")
    public ResponseEntity<?> getUserById(@RequestParam String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        UserDto userDto = userMapper.convertToUserDto(user);
        return ResponseEntity.ok(userDto);
    }


    @GetMapping("/page")
    public ResponseEntity<Page<UserDto>> getUsers(
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<UserDto> userPage = userServiceImpl.getAllUsers(searchValue, page, size);
        return ResponseEntity.ok(userPage);
    }

    @GetMapping("/customer")
    public ResponseEntity<Page<UserDto>> getUsersNonAdmin(
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<UserDto> userPage = userServiceImpl.getAllUsersNonAdmin(searchValue, page, size);
        return ResponseEntity.ok(userPage);
    }

    @GetMapping("/employee")
    public ResponseEntity<Page<UserDto>> getUsersAdmin(
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<UserDto> userPage = userServiceImpl.getAllUsersIsAdmin(searchValue, page, size);
        return ResponseEntity.ok(userPage);
    }

    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getUserStatistics() {
        Map<String, Object> statistics = new HashMap<>();
        statistics.put("totalUsers", userService.getTotalUserCount());
        statistics.put("usersByGender", userService.getUserCountByGender());
        statistics.put("usersByActiveStatus", userService.getUserCountByActiveStatus());
        return ResponseEntity.ok(statistics);
    }

    @PutMapping("/setActive/{id}")
    public ResponseEntity<UserDto> setActiveUser(@PathVariable String id) {
        UserDto userDto = userService.updateUserActive(id);
        return ResponseEntity.ok(userDto);
    }

}
