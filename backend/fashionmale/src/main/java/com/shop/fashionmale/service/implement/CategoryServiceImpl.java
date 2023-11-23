package com.shop.fashionmale.service.Implement;

import com.shop.fashionmale.model.Category;
import com.shop.fashionmale.repository.ICategoryRepository;
import com.shop.fashionmale.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements ICategoryService {
    @Autowired
    ICategoryRepository categoryRepository;

    @Override
    public Category findCategoryByCategoryName(String categoryName) {
        return categoryRepository.findCategoryByCategoryName(categoryName);
    }
    public List<Category> getListCategory(){
        return categoryRepository.findAll();
    }
}
