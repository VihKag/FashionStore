package com.shop.fashionmale.model;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_product_id")
    private Warehouseproduct warehouseProduct;

    @Column(name = "purchase_price")
    private Float purchasePrice;

    @Column(name = "selling_price")
    private Float sellingPrice;

    @Column(name = "update_date")
    private Instant updateDate;

}