package com.ecommerce.FashionStore.dto.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInRequest {
    private String username;
    private String password;

    // getters and setters
}