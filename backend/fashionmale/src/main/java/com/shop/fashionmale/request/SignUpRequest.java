package com.shop.fashionmale.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SignUpRequest {
    private String username;
    private String password;
    private String email;
    private Set<String> role;
}
