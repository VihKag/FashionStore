package com.shop.fashionmale.security.jwt;

import com.shop.fashionmale.security.userprintical.UserPrinciple;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
@Component
@Slf4j
public class JwtProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);
    @Value("${jwtSecret}")
    private String jwtSecret;
    private int jwtExpiration = 86400;


    public String createToken(Authentication authentication){
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
        return Jwts.builder().setSubject(userPrinciple.getUsername()).setIssuedAt(new Date()).setExpiration(new Date(new  Date().getTime()+jwtExpiration*1000))
                .signWith(SignatureAlgorithm.HS256,jwtSecret)
                .compact();
    }
    public boolean validateToken(String token){
        try{
            Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
            String userName = claims.getSubject();
            log.info("Validated token for user: {}", userName);
            return true;
        }catch (SignatureException e){
            logger.error("Invalid Jwt -> Message: {}",e);
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

    public String getUserNameFromToken(String token){
        String userName = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
        return userName;
    }
}
