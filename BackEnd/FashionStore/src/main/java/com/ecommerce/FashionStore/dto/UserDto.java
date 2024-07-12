package com.ecommerce.FashionStore.dto;

import com.ecommerce.FashionStore.entity.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Collection;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String id;
    private String email;
    private String name;
    private MultipartFile imageFile;
    private String image;
    private Boolean active;
    private String phone;
    private LocalDate birthday;
    private String firstName;
    private Boolean gender;
    private String lastName;
}
