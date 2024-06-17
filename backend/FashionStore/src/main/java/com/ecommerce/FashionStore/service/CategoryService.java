package com.ecommerce.FashionStore.service;

import com.ecommerce.FashionStore.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> findAll();
}
