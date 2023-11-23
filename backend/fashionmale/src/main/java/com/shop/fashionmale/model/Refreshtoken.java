package com.shop.fashionmale.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "refreshtoken")
public class Refreshtoken {
    @Id
    @Size(max = 255)
    @Column(name = "refreshtoken_id", nullable = false)
    private String refreshtokenId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Refreshtoken parent;

    @Column(name = "create_date")
    private Instant createDate;

    @Column(name = "isRevoked")
    private Boolean isRevoked;

    @OneToMany(mappedBy = "parent")
    private Set<Refreshtoken> refreshtoken = new LinkedHashSet<>();

    @Column(name = "expire_date")
    private Instant expireDate;

}