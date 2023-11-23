package com.shop.fashionmale.request;

import com.shop.fashionmale.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductRequest {
    private List<ProductDetailRequest> productdetails;
    private String productId;
    private String productName;
    private String category;
    private String brand;
    private String description;

    public void updateFormProduct(Product product){
        this.setProductId(product.getProductId());
        this.setProductName(product.getProductName());
        if (product.getCategory() != null) {
            this.setCategory(product.getCategory().getCategoryId());
        }
        this.setBrand(product.getBrand());
        this.setDescription(product.getDescription());
    }
}
