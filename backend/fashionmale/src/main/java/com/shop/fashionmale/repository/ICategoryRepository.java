package com.shop.fashionmale.repository;

import com.shop.fashionmale.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category, String> {
    Category findCategoryByCategoryName(String categoryName);
}
