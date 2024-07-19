package com.ecommerce.FashionStore.service;

import com.ecommerce.FashionStore.dto.ProductDto;
import com.ecommerce.FashionStore.dto.ProductWithDetailsDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface ProductService {
    Page<ProductWithDetailsDto> getAllProducts(Pageable pageable);
    ProductWithDetailsDto getProductById(String id);
//    Page<ProductDto> getAllActiveProducts(String categoryId, double minPrice, double maxPrice, int page, int size);
    Page<ProductWithDetailsDto> getAllActiveProducts(String categoryId, String searchValue, double minPrice, double maxPrice, int page, int size);
    Page<ProductWithDetailsDto> getAllProducts(String categoryId, String searchValue, int page, int size);
    Long countActiveProducts();
    Long getTotalProductCount();
    Map<String, Long> getProductCountByCategory();
    Map<String, Long> getProductCountByBrand();

}
