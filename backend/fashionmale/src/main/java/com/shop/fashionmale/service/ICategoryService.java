package com.shop.fashionmale.service;

import com.shop.fashionmale.model.Category;

public interface ICategoryService {
    Category findCategoryByCategoryName(String categoryName);
}
