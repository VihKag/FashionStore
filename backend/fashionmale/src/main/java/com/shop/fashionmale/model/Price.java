package com.shop.fashionmale.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "price")
public class Price {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "price_id", nullable = false)
    private Long id;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productdetail_id")
    private Productdetail productdetail;

    @Column(name = "purchase_price")
    private Float purchasePrice;

    @Column(name = "selling_price")
    private Float sellingPrice;

    @Column(name = "update_date")
    private Instant updateDate;

}