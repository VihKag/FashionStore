package com.ecommerce.FashionStore.service;

import com.ecommerce.FashionStore.entity.User;

public interface TokenService {
    User getUserFromToken(String token);
}
