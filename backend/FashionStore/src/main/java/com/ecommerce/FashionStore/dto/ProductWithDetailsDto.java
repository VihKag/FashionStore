package com.ecommerce.FashionStore.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductWithDetailsDto {
    private ProductDto productDto;
    private List<ProductDetailDto> productDetailDto;
}
