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
@Table(name = "size")
public class Size {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "size_name")
    private String sizeName;

    public Size(String sizeName) {
        this.sizeName = sizeName;
    }
    @OneToMany(mappedBy = "size")
    private Set<Productdetail> productdetails = new LinkedHashSet<>();

}