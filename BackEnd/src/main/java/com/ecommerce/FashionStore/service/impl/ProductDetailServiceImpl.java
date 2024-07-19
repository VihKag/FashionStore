package com.ecommerce.FashionStore.service.impl;

import com.ecommerce.FashionStore.dto.ProductDetailDto;
import com.ecommerce.FashionStore.entity.Productdetail;
import com.ecommerce.FashionStore.mapper.ProductMapper;
import com.ecommerce.FashionStore.repository.ProductDetailRepository;
import com.ecommerce.FashionStore.repository.ProductRepository;
import com.ecommerce.FashionStore.service.ProductDetailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {
    private static final Logger log = LoggerFactory.getLogger(ProductDetailServiceImpl.class);
    private final ProductDetailRepository productDetailRepository;
    private final ProductMapper productMapper;
    public ProductDetailServiceImpl(ProductDetailRepository productDetailRepository, ProductMapper productMapper) {
        this.productDetailRepository = productDetailRepository;
        this.productMapper = productMapper;
    }

    @Override
    public ProductDetailDto getProductDetailByProductColorAndSize(String productId, Integer colorId, Integer sizeId) {
        Productdetail productdetail = productDetailRepository.findByProductIdAndColorIdAndSizeId(productId, colorId, sizeId)
                .orElseThrow(() -> new RuntimeException("ProductDetail not found for productId: " + productId + ", colorId: " + colorId + ", sizeId: " + sizeId));
        log.info("item: {}", productdetail);
        return productMapper.convertToProductDetailDto(productdetail);
    }
}
