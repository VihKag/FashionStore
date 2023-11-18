package com.shop.fashionmale.dto.request;

import com.shop.fashionmale.model.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductRequest {
    private String productId;
    private String productName;
    private Category category;
    private String brand;
    private boolean stockStatus;
    private String description;
    private String color;
    private String size;
    private String warehouse;
    private int stockQuantity;
    private float purchasePrice;
    private float sellingPrice;
    private LocalDateTime importDate;
}
