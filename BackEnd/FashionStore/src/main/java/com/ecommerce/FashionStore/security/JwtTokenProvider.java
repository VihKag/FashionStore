package com.ecommerce.FashionStore.security;

import com.ecommerce.FashionStore.entity.User;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
    private final String JWT_SECRET = "your-jwt-secret";
    private final long JWT_EXPIRATION = 86400000L; // 1 day

    public String generateToken(Authentication authentication) {
        User userPrincipal = (User) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        Collection<? extends GrantedAuthority> roles = userPrincipal.getAuthorities();
        // Chuyển đổi roles thành danh sách chuỗi
        List<String> roleList = roles.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        // Tạo claims
        Claims claims = Jwts.claims()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiryDate);
        // Thêm thông tin vào claims
        claims.put("name", userPrincipal.getUsername());
        claims.put("email", userPrincipal.getEmail());
        claims.put("roles", roleList);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }
    public String getEmailFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();

        return claims.get("email", String.class);
    }
    public List<?> getRolesFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();

        return claims.get("roles", List.class);
    }
    public Instant getExpirationDateFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();

        return claims.getExpiration().toInstant();
    }
    public boolean validateToken(String authToken) {
        try {
            Claims claims= Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken).getBody();
            String userName = claims.getSubject();
            log.info("Validated token for user: {}", userName);
            return true;
        }catch(MalformedJwtException e){
            logger.error("The tokken Invalid format -> Message: {}",e);
        }catch(UnsupportedJwtException e){
            logger.error("Unsupported jwt token -> Message: {}",e);
        }catch(ExpiredJwtException e){
            logger.error("Expired jwt token -> Message {}",e);
        }catch (IllegalArgumentException e){
            logger.error("Jwt claims string is empty -> Message {}",e);
        }
        return false;
    }
}

