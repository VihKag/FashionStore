package com.shop.fashionmale.dto.request;

import com.shop.fashionmale.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SignUpForm {
    private String username;
    private String password;
    private String email;
    private String role;
}
