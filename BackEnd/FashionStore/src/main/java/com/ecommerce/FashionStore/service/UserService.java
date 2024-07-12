package com.ecommerce.FashionStore.service;

import com.ecommerce.FashionStore.dto.UserDto;
import com.ecommerce.FashionStore.entity.User;
import org.springframework.data.domain.Page;

import java.io.IOException;
import java.util.Map;

public interface UserService {
    Page<UserDto> getAllUsers(String searchValue, int page, int size);
    Page<UserDto> getAllUsersNonAdmin(String searchValue, int page, int size);
    Page<UserDto> getAllUsersIsAdmin(String searchValue, int page, int size);
    long getTotalUserCount();
    Map<String, Long> getUserCountByGender();
    Map<String, Long> getUserCountByActiveStatus();
    User updateUser(String userId, UserDto userDto) throws IOException;
    UserDto updateUserActive(String userId);
}
