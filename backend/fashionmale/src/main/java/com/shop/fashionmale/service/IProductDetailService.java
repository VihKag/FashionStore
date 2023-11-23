package com.shop.fashionmale.service;

import com.shop.fashionmale.request.ProductDetailRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductDetailService {
    Page<ProductDetailRequest> getInventoryDetail(Pageable pageable);
}
