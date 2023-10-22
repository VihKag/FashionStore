package com.shop.fashionmale.security.userprintical;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shop.fashionmale.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;


public class UserPrinciple implements UserDetails {
    private String id;
    private String username;
    private String email;
    @JsonIgnore
    private String password;
    private Collection<? extends GrantedAuthority> role;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role;
    }
    public UserPrinciple() {
    }

    public UserPrinciple(String id, String username, String email, String password, Collection<? extends GrantedAuthority> role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    public static UserPrinciple build(User user){
//        List<GrantedAuthority> authorities = Arrays.stream(user.getRole().getRoleName().split(",")).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRole().getRoleName()));
        return  new UserPrinciple(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                user.getPassword(),
                authorities
        );
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
