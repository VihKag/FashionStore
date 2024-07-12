package com.ecommerce.FashionStore.service;

import com.ecommerce.FashionStore.dto.ProductDetailDto;

public interface ProductDetailService {
    ProductDetailDto getProductDetailByProductColorAndSize(String productId, Integer colorId, Integer sizeId);
}
