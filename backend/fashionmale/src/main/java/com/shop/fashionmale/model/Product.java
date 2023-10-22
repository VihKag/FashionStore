package com.shop.fashionmale.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "product")
public class Product {
    @Id
    @Column(name = "product_id", nullable = false, length = 21)
    private String productId;

    @Column(name = "product_name")
    private String productName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "brand_id", length = 21)
    private String brandId;

    @Lob
    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "product")
    private Set<Evaluate> evaluates = new LinkedHashSet<>();

    @OneToMany(mappedBy = "product")
    private Set<Imageproduct> imageproducts = new LinkedHashSet<>();

    @OneToMany(mappedBy = "product")
    private Set<Orderdetail> orderdetails = new LinkedHashSet<>();

    @OneToMany(mappedBy = "product")
    private Set<Warehouseproduct> warehouseproducts = new LinkedHashSet<>();

}