package com.ecommerce.FashionStore.service;

import com.ecommerce.FashionStore.service.impl.TokenServiceImpl;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TokenCleaner {
    private final TokenServiceImpl tokenService;

    public TokenCleaner(TokenServiceImpl tokenService) {
        this.tokenService = tokenService;
    }

    @Scheduled(cron = "0 0 0 * * *") // Chạy vào lúc 0 giờ mỗi ngày
    public void cleanExpiredTokens() {
        tokenService.deleteExpiredTokens();
    }
}