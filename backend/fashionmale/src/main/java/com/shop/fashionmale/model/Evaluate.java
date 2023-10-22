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
@Table(name = "evaluate")
public class Evaluate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "evaluate_id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Customerprofile user;

    @Column(name = "star_rating")
    private Integer starRating;

    @Lob
    @Column(name = "review")
    private String review;

    @Column(name = "evaluate_date")
    private Instant evaluateDate;

    @OneToMany(mappedBy = "evaluate")
    private Set<Comment> comments = new LinkedHashSet<>();

}