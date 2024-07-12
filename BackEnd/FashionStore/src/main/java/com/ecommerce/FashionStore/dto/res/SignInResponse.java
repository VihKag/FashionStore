package com.ecommerce.FashionStore.dto.res;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SignInResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String name;
    private String email;
    private List<?> role;
    private String image;

    public SignInResponse(String accessToken, String name, String email, List<?> role, String image) {
        this.accessToken = accessToken;
        this.tokenType = "Bearer";
        this.name = name;
        this.email = email;
        this.role = role;
        this.image = image;
    }

    // getters and setters
}