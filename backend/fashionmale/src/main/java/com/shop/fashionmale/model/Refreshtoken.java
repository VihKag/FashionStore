package com.shop.fashionmale.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "refreshtoken")
public class Refreshtoken {
    @Id
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

    @Column(name = "exprite_date")
    private Instant expriteDate;

    @Column(name = "isUsed")
    private Boolean isUsed;

    @Column(name = "isRevoked")
    private Boolean isRevoked;

    @Column(name = "is_revoked")
    private Boolean isRevoked1;

    @Column(name = "is_used")
    private Boolean isUsed1;

    @OneToMany(mappedBy = "parent")
    private Set<Refreshtoken> refreshtokens = new LinkedHashSet<>();

}