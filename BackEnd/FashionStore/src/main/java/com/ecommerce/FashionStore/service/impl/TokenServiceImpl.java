package com.ecommerce.FashionStore.service.impl;

import com.ecommerce.FashionStore.entity.Token;
import com.ecommerce.FashionStore.entity.User;
import com.ecommerce.FashionStore.repository.TokenRepository;
import com.ecommerce.FashionStore.repository.UserRepository;
import com.ecommerce.FashionStore.service.TokenService;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class TokenServiceImpl implements TokenService {
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    public TokenServiceImpl(TokenRepository tokenRepository, UserRepository userRepository) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
    }

    public boolean isTokenValid(String token) {
        Token tokenEntity = tokenRepository.findByToken(token);
        if (tokenEntity != null) {
            // Kiểm tra xem token có hết hạn chưa
            return tokenEntity.getExpireDate().isAfter(Instant.now());
        }
        return false;
    }

    public void deleteExpiredTokens() {
        // Xóa các token đã hết hạn
        tokenRepository.deleteByExpireDateBefore(Instant.now());
    }

    @Override
    public User getUserFromToken(String token) {
        Token tk = tokenRepository.findByToken(token);
        if (tk != null) {
            return userRepository.findById(tk.getUser().getId()).orElse(null);
        }
        return null;
    }
}
