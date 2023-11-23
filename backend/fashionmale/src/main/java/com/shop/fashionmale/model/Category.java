package com.shop.fashionmale.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shop.fashionmale.request.CategoryRequest;
import com.shop.fashionmale.request.ProductRequest;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "category")
public class Category {
    @Id
    @Column(name = "category_id", nullable = false, length = 21)
    private String categoryId;

    @Column(name = "category_name")
    private String categoryName;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_category_id")
    private Category parentCategory;

    @OneToMany(mappedBy = "parentCategory")
    private Set<Category> categories = new LinkedHashSet<>();
    @OneToMany(mappedBy = "category")
    private Set<Product> products = new LinkedHashSet<>();
    public void updateFromCategoryRequest(CategoryRequest request) {
        this.setCategoryId(request.getCategoryId());
        this.setCategoryName(request.getCategoryId());
    }
}