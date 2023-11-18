package com.shop.fashionmale.security.usercustome;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shop.fashionmale.model.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
public class UserPrinciple implements UserDetails {
    private String id;
    private String username;
    private String email;
    @JsonIgnore
    private String password;
    private Collection<? extends GrantedAuthority> role;
    private String rolename;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role;
    }
    public UserPrinciple() {
    }

//    public UserPrinciple(String id, String username, String email, String password, Collection<? extends GrantedAuthority> role) {
//        this.id = id;
//        this.username = username;
//        this.email = email;
//        this.password = password;
//        this.role = role;
//    }
    public UserPrinciple(String id, String username, String email, String password, String rolename) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.rolename = rolename;
    }
    public static UserPrinciple build(User user){
//        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRole().getRoleName()));
        return new UserPrinciple(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getRole().getRoleName()
//                authorities
        );
    }
    public String getId() {return id;}

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
