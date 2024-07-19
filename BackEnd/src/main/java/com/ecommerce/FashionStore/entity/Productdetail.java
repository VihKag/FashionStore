package com.ecommerce.FashionStore.entity;

import com.ecommerce.FashionStore.entity.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "productdetails")
public class Productdetail {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "image")
    private String image;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    @Column(name = "import_date")
    private LocalDateTime importDate;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_id")
    private Color color;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "size_id")
    private Size size;

    public Productdetail(String id,Product product,String image , Integer stockQuantity, Color color, Size size) {
        this.id = id;
        this.product = product;
        this.image = image;
        this.stockQuantity = stockQuantity;
        this.importDate = LocalDateTime.now();
        this.color = color;
        this.size = size;
    }
    @JsonIgnore
    @OneToMany(mappedBy = "productDetails")
    private Set<Orderdetail> orderdetails = new LinkedHashSet<>();

}