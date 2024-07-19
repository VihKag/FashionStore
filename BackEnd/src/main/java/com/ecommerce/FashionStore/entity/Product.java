package com.ecommerce.FashionStore.entity;
import com.ecommerce.FashionStore.entity.Category;
import com.ecommerce.FashionStore.entity.Evaluate;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "product")
public class Product {
    @Id
    @Column(name = "id", nullable = false)
    private String id;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @Column(name = "product_name")
    private String productName;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "image")
    private String image;

    @Column(name = "brand")
    private String brand;

    @Column(name = "type")
    private String type;

    @Column(name = "price")
    private double price;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "description", length = 1000)
    private String description;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private Set<Evaluate> evaluates = new LinkedHashSet<>();
    @OneToMany(mappedBy = "product")
    private Set<Productdetail> productdetails = new LinkedHashSet<>();

    public Product(String id, Warehouse warehouse, String productName,Category category , String image,
                   String brand, Boolean active, String description,String type, double price) {
        this.id = id;
        this.warehouse = warehouse;
        this.productName = productName;
        this.category = category;
        this.image = image;
        this.brand = brand;
        this.active = active;
        this.description = description;
        this.type = type;
        this.price = price;
    }

}