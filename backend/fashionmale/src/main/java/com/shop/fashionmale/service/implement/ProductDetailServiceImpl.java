package com.shop.fashionmale.service.Implement;

import com.shop.fashionmale.model.Price;
import com.shop.fashionmale.model.Productdetail;
import com.shop.fashionmale.repository.IPriceRepository;
import com.shop.fashionmale.repository.IProductDetailRepository;
import com.shop.fashionmale.request.ProductDetailRequest;
import com.shop.fashionmale.service.IProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductDetailServiceImpl implements IProductDetailService {
    @Autowired
    IProductDetailRepository productDetailRepository;
    @Autowired
    IPriceRepository priceRepository;
    @Override
    public Page<ProductDetailRequest> getInventoryDetail(Pageable pageable) {
        Page<Productdetail> productDetails = productDetailRepository.findAll(pageable);

        List<ProductDetailRequest> productDetailRequestsList = productDetails.getContent().stream()
                .map(productDetail -> {
                    ProductDetailRequest productDetailRequest = new ProductDetailRequest();
                    productDetailRequest.updateFromProductDetail(productDetail);
                    return productDetailRequest;
                })
                .collect(Collectors.toList());
        Page<ProductDetailRequest> productDetailRequests = new PageImpl<>(productDetailRequestsList, pageable, productDetails.getTotalElements());
        return productDetailRequests;
    }

}
