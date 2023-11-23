package com.shop.fashionmale.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.*;

@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "user_id", columnDefinition = "CHAR(36)", nullable = false)
    private String id;
    @NotBlank
    @Column(name = "username", nullable = false, length = 50,  unique = true)
    private String username;
    @NotBlank
    @Size(min = 6, max = 100)
    @Column(name = "password", nullable = false)
    private String password;
    @Email
    @Column(name = "email", nullable = false, length = 50, unique = true)
    private String email;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Collection<Role> roles =new ArrayList<>();

    @Column(name = "isActive")
    private Boolean isActive;

    @OneToMany(mappedBy = "user")
    private Set<Comment> comments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Refreshtoken> refreshtoken = new LinkedHashSet<>();

    @Lob
    @Column(name = "image")
    private String image;

    public User(@NotBlank String username,@Email String email,@NotBlank @NotBlank
    @Size(min = 8, max = 100) String encode) {
        this.username = username;
        this.email = email;
        this.password = encode;
    }

    public User() {
    }
}