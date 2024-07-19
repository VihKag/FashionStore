package com.ecommerce.FashionStore.repository;

import com.ecommerce.FashionStore.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, String> {
    Optional<Token> findByUserId(String userId);
    Token findByToken(String token);
    void deleteByExpireDateBefore(LocalDateTime date);
}