package com.ecommerce.FashionStore.entity;

import com.ecommerce.FashionStore.entity.Productdetail;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Table(name = "color")
public class Color {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "color_code")
    private String colorCode;

    @Column(name = "color_name")
    private String colorName;

    public Color(String colorCode, String colorName) {
        this.colorCode = colorCode;
        this.colorName = colorName;
    }
    @OneToMany(mappedBy = "color")
    private Set<Productdetail> productdetails = new LinkedHashSet<>();

}