package com.ecommerce.FashionStore.mapper;

import com.ecommerce.FashionStore.dto.UserDto;
import com.ecommerce.FashionStore.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDto convertToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail() != null ? user.getEmail() : "");
        userDto.setName(user.getName() != null ? user.getName() : "");
        userDto.setImage(user.getImage() != null ? user.getImage() : "");
        userDto.setActive(user.getActive() != null ? user.getActive() : false);
        userDto.setPhone(user.getPhone() != null ? user.getPhone() : "");
        userDto.setBirthday(user.getBirthday());
        userDto.setFirstName(user.getFirstName() != null ? user.getFirstName() : "");
        userDto.setGender(user.getGender() != null ? user.getGender() : false);
        userDto.setLastName(user.getLastName() != null ?  user.getLastName() : "");
        return userDto;
    }

    public User convertToUser(UserDto userDto) {
        User user = new User();
        user.setEmail(userDto.getEmail() != null ? userDto.getEmail() : user.getEmail());
        user.setName(userDto.getName() != null ? userDto.getName() : user.getName());
        user.setImage(userDto.getImage() != null ? userDto.getImage() : user.getImage());
        user.setPhone(userDto.getPhone() != null ? userDto.getPhone() : user.getPhone());
        user.setBirthday(userDto.getBirthday() != null ? userDto.getBirthday() : user.getBirthday());
        user.setFirstName(userDto.getFirstName() != null ? userDto.getFirstName() : user.getFirstName());
        user.setGender(userDto.getGender() != null ? userDto.getGender() : user.getGender());
        user.setLastName(userDto.getLastName() != null ? userDto.getLastName() : user.getLastName());
        return user;
    }

    public void updateUserFromDto(UserDto userDto, User user) {
        user.setEmail(userDto.getEmail() != null ? userDto.getEmail() : user.getEmail());
        user.setName(userDto.getName() != null ? userDto.getName() : user.getName());
        user.setImage(userDto.getImage() != null ? userDto.getImage() : user.getImage());
        user.setPhone(userDto.getPhone() != null ? userDto.getPhone() : user.getPhone());
        user.setBirthday(userDto.getBirthday() != null ? userDto.getBirthday() : user.getBirthday());
        user.setFirstName(userDto.getFirstName() != null ? userDto.getFirstName() : user.getFirstName());
        user.setGender(userDto.getGender() != null ? userDto.getGender() : user.getGender());
        user.setLastName(userDto.getLastName() != null ? userDto.getLastName() : user.getLastName());
    }
}
