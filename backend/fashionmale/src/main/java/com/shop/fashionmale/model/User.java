package com.shop.fashionmale.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
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
    @Column(name = "username", nullable = false, length = 50)
    private String username;
    @NotBlank
    @Size(min = 6, max = 100)
    @Column(name = "password", nullable = false)
    private String password;
    @Email
    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "role_id")
    private Role role;

    @Column(name = "isActive")
    private Boolean isActive;

    @Column(name = "is_active")
    private Boolean isActive1;

    @OneToOne(mappedBy = "user")
    private Adminprofile adminprofile;

    @OneToMany(mappedBy = "user")
    private Set<Comment> comments = new LinkedHashSet<>();

    @OneToOne(mappedBy = "user")
    private Customerprofile customerprofile;

    @OneToMany(mappedBy = "user")
    private Set<Refreshtoken> refreshtokens = new LinkedHashSet<>();

    public User(@NotBlank String username,@Email String email,@NotBlank @NotBlank
    @Size(min = 8, max = 100) String encode) {
        this.username = username;
        this.email = email;
        this.password = encode;
    }

    public User() {
    }
}