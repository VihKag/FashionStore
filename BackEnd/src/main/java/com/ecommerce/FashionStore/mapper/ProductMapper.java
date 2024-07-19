package com.ecommerce.FashionStore.mapper;

import com.ecommerce.FashionStore.dto.*;
import com.ecommerce.FashionStore.entity.Product;
import com.ecommerce.FashionStore.entity.Productdetail;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {
    public ProductDto convertToProductDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setWarehouseName(product.getWarehouse().getName());
        dto.setProductName(product.getProductName());
        dto.setCategoryName(product.getCategory().getName());
        dto.setImage(product.getImage());
        dto.setBrand(product.getBrand() != null ? product.getBrand() : "No brand");
        dto.setActive(product.getActive());
        dto.setDescription(product.getDescription());
        dto.setType(product.getType());
        dto.setPrice(product.getPrice());
        return dto;
    }

    public ProductDetailDto convertToProductDetailDto(Productdetail productDetail) {
        ProductDetailDto dto = new ProductDetailDto();
        dto.setId(productDetail.getId());
        dto.setProductId(productDetail.getProduct().getId());
        dto.setImage(productDetail.getImage());
        dto.setStockQuantity(productDetail.getStockQuantity());
        dto.setImportDate(productDetail.getImportDate());
        if(productDetail.getColor() != null) {
            dto.setColor(new ColorDto(productDetail.getColor().getId(), productDetail.getColor().getColorCode(),productDetail.getColor().getColorName()));
        }
        if(productDetail.getSize() != null){
            dto.setSize(new SizeDto(productDetail.getSize().getId(), productDetail.getSize().getSizeName()));
        }
        return dto;
    }
    public ProductWithDetailsDto convertToProductWithDetailsDto(Product product, List<Productdetail> productDetails) {
        ProductDto productDto = new ProductMapper().convertToProductDto(product);
        List<ProductDetailDto> productDetailDtos = productDetails.stream()
                .map(detail -> convertToProductDetailDto(detail))
                .collect(Collectors.toList());

        return new ProductWithDetailsDto(productDto, productDetailDtos);
    }
}
