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
@Table(name = "warehouseproduct")
public class Warehouseproduct {
    @Id
    @Column(name = "warehouse_product_id", nullable = false, length = 21)
    private String warehouseProductId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "input_date")
    private Instant inputDate;

    @Column(name = "product_size", length = 5)
    private String productSize;

    @Lob
    @Column(name = "product_color")
    private String productColor;

    @OneToMany(mappedBy = "warehouseProduct")
    private Set<Price> prices = new LinkedHashSet<>();

}