package com.ecommerce.FashionStore.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private String id;
    private String warehouseName;
    private String productName;
    private String categoryName;
    private String image;
    private String brand;
    private boolean active;
    private String description;
    private String type;
    private double price;
}
