package com.shop.fashionmale.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "warehouse")
public class Warehouse {
    @Id
    @Size(max = 21)
    @Column(name = "warehouse_id", nullable = false, length = 21)
    private String warehouseId;

    @Size(max = 255)
    @Column(name = "warehouse_name")
    private String warehouseName;

    @Lob
    @Column(name = "location")
    private String location;

    @OneToMany(mappedBy = "warehouse")
    private Set<Productdetail> productdetails = new LinkedHashSet<>();

}