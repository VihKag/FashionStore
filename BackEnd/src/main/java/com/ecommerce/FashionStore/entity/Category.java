package com.ecommerce.FashionStore.entity;

import com.ecommerce.FashionStore.entity.Product;
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
@Table(name = "category")
public class Category {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "name")
    private String name;
    public Category(String id,String name) {
        this.name = name;
        this.id = id;
    }
    @OneToMany(mappedBy = "category")
    private Set<Product> products = new LinkedHashSet<>();

}