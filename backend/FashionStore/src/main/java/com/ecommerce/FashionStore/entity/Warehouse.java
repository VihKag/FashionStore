package com.ecommerce.FashionStore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "warehouse")
public class Warehouse {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "location")
    private String location;

    public Warehouse(String id, String name, String location) {
        this.id = id;
        this.name = name;
        this.location = location;
    }

    @OneToMany(mappedBy = "warehouse")
    private Set<Product> products = new LinkedHashSet<>();

}