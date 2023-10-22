package com.shop.fashionmale.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "warehouse")
public class Warehouse {
    @Id
    @Column(name = "warehouse_id", nullable = false, length = 21)
    private String warehouseId;

    @Column(name = "warehouse_name")
    private String warehouseName;

    @Lob
    @Column(name = "location")
    private String location;

    @OneToMany(mappedBy = "warehouse")
    private Set<Warehouseproduct> warehouseproducts = new LinkedHashSet<>();

}