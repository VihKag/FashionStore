package com.shop.fashionmale.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shop.fashionmale.request.ProductRequest;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product")
public class Product {
    @Id
    @Size(max = 255)
    @Column(name = "product_id", nullable = false, length = 255)
    private String productId;

    @Size(max = 255)
    @Column(name = "product_name")
    private String productName;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    @Lob
    @Column(name = "brand")
    private String brand;

    @Column(name = "stock_status")
    private Boolean stockStatus;

    @Lob
    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "product")
    private Set<Evaluate> evaluates = new LinkedHashSet<>();

    @OneToMany(mappedBy = "product")
    private Set<Orderdetail> orderdetails = new LinkedHashSet<>();

    @OneToMany(mappedBy = "product")
    private Set<Productdetail> productdetails = new LinkedHashSet<>();


    public Product(String productId, String productName, Category category, String brand, String description) {
        this.productId =productId;
        this.productName=productName;
        this.category =category;
        this.brand = brand;
        this.description = description;
    }
    public Product(String productName, Category category, String brand, String description) {
        this.productName=productName;
        this.category =category;
        this.brand = brand;
        this.description = description;
    }
    public void updateFromProductRequest(ProductRequest request) {
        this.setProductId(request.getProductId());
        this.setProductName(request.getProductName());
        this.setBrand(request.getBrand());
        this.setDescription(request.getDescription());
    }
}