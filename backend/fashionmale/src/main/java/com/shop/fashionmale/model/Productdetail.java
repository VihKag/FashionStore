package com.shop.fashionmale.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shop.fashionmale.request.ProductDetailRequest;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "productdetail")
public class Productdetail {
    @Id
    @Column(name = "productdetail_id", nullable = false, length = 255)
    private String productdetailId;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    @Column(name = "import_date")
    private Instant importDate;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "size_id")
    private Size size;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_id")
    private Color color;
    @OneToMany(mappedBy = "productdetail")
    private Set<Imageproduct> imageproducts = new LinkedHashSet<>();

    @OneToMany(mappedBy = "productdetail")
    private Set<Price> prices = new LinkedHashSet<>();

    public void updateFromProductDetailRequest(ProductDetailRequest request) {
        this.setProductdetailId(request.getProductdetailId());
        this.setProduct(request.getProduct());
        this.setStockQuantity(request.getStockQuantity());
        this.setImportDate(Instant.now());
    }
}