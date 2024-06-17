package com.ecommerce.FashionStore.service.impl;

import com.ecommerce.FashionStore.dto.UserDto;
import com.ecommerce.FashionStore.entity.Product;
import com.ecommerce.FashionStore.entity.Productdetail;
import com.ecommerce.FashionStore.entity.User;
import com.ecommerce.FashionStore.mapper.ProductMapper;
import com.ecommerce.FashionStore.mapper.UserMapper;
import com.ecommerce.FashionStore.repository.ProductRepository;
import com.ecommerce.FashionStore.repository.UserRepository;
import com.ecommerce.FashionStore.service.CloudinaryService;
import com.ecommerce.FashionStore.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final CloudinaryService cloudinaryService;
    private final ProductMapper productMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, CloudinaryService cloudinaryService, ProductMapper productMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.cloudinaryService = cloudinaryService;
        this.productMapper = productMapper;
    }

    @Override
    public Page<UserDto> getAllUsers(String searchValue, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userRepository.findBySearchValue(searchValue, pageable);

        return users.map(userMapper::convertToUserDto);
    }

    @Override
    public Page<UserDto> getAllUsersNonAdmin(String searchValue, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userRepository.findNonAdminUsers(searchValue, pageable);

        return users.map(userMapper::convertToUserDto);
    }

    @Override
    public Page<UserDto> getAllUsersIsAdmin(String searchValue, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userRepository.findAdminUsers(searchValue, pageable);

        return users.map(userMapper::convertToUserDto);
    }

    @Override
    public long getTotalUserCount() {
        return userRepository.count();
    }

    @Override
    public Map<String, Long> getUserCountByGender() {
        Map<String, Long> genderStats = new HashMap<>();
        genderStats.put("male", userRepository.countByGender(true));
        genderStats.put("female", userRepository.countByGender(false));
        return genderStats;
    }

    @Override
    public Map<String, Long> getUserCountByActiveStatus() {
        Map<String, Long> activeStats = new HashMap<>();
        activeStats.put("active", userRepository.countByActive(true));
        activeStats.put("inactive", userRepository.countByActive(false));
        return activeStats;
    }

    @Override
    public User updateUser(String id, UserDto userDto) throws IOException {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (userDto.getImageFile() != null && !userDto.getImageFile().isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(userDto.getImageFile());
            existingUser.setImage(imageUrl);
        }

        // Cập nhật các trường khác
        if (userDto.getEmail() != null) existingUser.setEmail(userDto.getEmail());
        if (userDto.getName() != null) existingUser.setName(userDto.getName());
        if (userDto.getPhone() != null) existingUser.setPhone(userDto.getPhone());
        if (userDto.getBirthday() != null) existingUser.setBirthday(userDto.getBirthday());
        if (userDto.getFirstName() != null) existingUser.setFirstName(userDto.getFirstName());
        if (userDto.getGender() != null) existingUser.setGender(userDto.getGender());
        if (userDto.getLastName() != null) existingUser.setLastName(userDto.getLastName());

        return userRepository.save(existingUser);
    }

    @Override
    public UserDto updateUserActive(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        user.setActive(!user.getActive());
        userRepository.save(user);
        return userMapper.convertToUserDto(user);
    }

}
