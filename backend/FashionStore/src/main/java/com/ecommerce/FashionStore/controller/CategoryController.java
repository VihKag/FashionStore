package com.ecommerce.FashionStore.controller;

import com.ecommerce.FashionStore.dto.CategoryDto;
import com.ecommerce.FashionStore.entity.Category;
import com.ecommerce.FashionStore.repository.CategoryRepository;
import com.ecommerce.FashionStore.service.CategoryService;
import com.ecommerce.FashionStore.service.impl.CategoryServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CategoryController {
    private final CategoryRepository CategoryRepository;
    private final CategoryServiceImpl categoryService;
    public CategoryController(CategoryRepository CategoryRepository, CategoryServiceImpl categoryService) {
        this.CategoryRepository = CategoryRepository;
        this.categoryService = categoryService;
    }

    @GetMapping("/list")
    public ResponseEntity<?> getAll() {
        try{
            List<CategoryDto> CategoryList = categoryService.findAll();
            return ResponseEntity.ok(CategoryList);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Get Category Failed");
        }
    }

}
