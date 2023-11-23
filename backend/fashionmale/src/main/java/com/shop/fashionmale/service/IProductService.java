package com.shop.fashionmale.service;

import com.shop.fashionmale.model.*;
import com.shop.fashionmale.request.ProductDetailRequest;
import com.shop.fashionmale.request.ProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IProductService {
    List<Product> findProductByCategoryCategoryName(String category);
    List<Product> searchProductByProductName(String name);
    Product save(Product product);
    Boolean existsProductByProductId(String id);
    Optional<Product> findProductByProductId(String id);
    Page<Product> findAll(Pageable pageable);
    void addProduct(ProductRequest productRequest);
    Page<ProductRequest> getInventories (Pageable pageable);
//    Page<ProductDetailRequest> getInventoryDetail (Pageable pageable);

}
