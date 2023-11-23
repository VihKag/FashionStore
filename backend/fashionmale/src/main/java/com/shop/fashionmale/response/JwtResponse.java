package com.shop.fashionmale.response;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
@Getter
@Setter
public class JwtResponse {
    String token;
    private String type = "Bearer";
    private String username;
    private Collection<? extends GrantedAuthority> role;

    public JwtResponse(String token, String type, String username, Collection<? extends GrantedAuthority> role) {
        this.token = token;
        this.type = type;
        this.username = username;
        this.role = role;
    }

    public JwtResponse() {
    }

    public JwtResponse(String token, String username, Collection<? extends GrantedAuthority> authorities) {
        this.token=token;
        this.username=username;
        this.role=authorities;
    }
}
