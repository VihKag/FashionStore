package com.ecommerce.FashionStore.service.impl;

import com.ecommerce.FashionStore.dto.*;
import com.ecommerce.FashionStore.entity.Product;
import com.ecommerce.FashionStore.entity.Productdetail;
import com.ecommerce.FashionStore.mapper.ProductMapper;
import com.ecommerce.FashionStore.repository.ProductDetailRepository;
import com.ecommerce.FashionStore.repository.ProductRepository;
import com.ecommerce.FashionStore.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    private ProductMapper productMapper;
    private ProductDetailRepository productDetailRepository;
    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper, ProductDetailRepository productDetailRepository) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.productDetailRepository = productDetailRepository;
    }
    @Override
    public Page<ProductWithDetailsDto> getAllProducts(Pageable pageable) {
        Page<Product> productsPage = productRepository.findAll(pageable);
        List<ProductWithDetailsDto> productWithDetailsDtos = productsPage.getContent().stream()
                .map(this::mapToProductWithDetailsDto)
                .collect(Collectors.toList());

        return new PageImpl<>(productWithDetailsDtos, pageable, productsPage.getTotalElements());
    }

    @Override
    public ProductWithDetailsDto getProductById(String id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        return mapToProductWithDetailsDto(product);
    }

    @Override
    public Page<ProductWithDetailsDto> getAllActiveProducts(String categoryId, String searchValue, double minPrice, double maxPrice, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productRepository.findByCategoryAndPriceRangeAndActive(categoryId, searchValue, minPrice, maxPrice, pageable);

        return products.map(product -> {
            List<Productdetail> productDetails = productDetailRepository.findByProductId(product.getId());
            return productMapper.convertToProductWithDetailsDto(product, productDetails);
        });
    }

    @Override
    public Page<ProductWithDetailsDto> getAllProducts(String categoryId, String searchValue, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productRepository.findByCategoryAndSearchValue(categoryId, searchValue, pageable);

        return products.map(product -> {
            List<Productdetail> productDetails = productDetailRepository.findByProductId(product.getId());
            return productMapper.convertToProductWithDetailsDto(product, productDetails);
        });
    }

    @Override
    public Long countActiveProducts() {
        return productRepository.countActiveProducts();
    }

    @Override
    public Long getTotalProductCount() {
        return productRepository.count();
    }

    @Override
    public Map<String, Long> getProductCountByCategory() {
        List<Object[]> countsByCategory = productRepository.countProductsByCategory();
        return countsByCategory.stream()
                .collect(HashMap::new, (m, v) -> m.put((String) v[0], ((Number) v[1]).longValue()), HashMap::putAll);
    }

    @Override
    public Map<String, Long> getProductCountByBrand() {
        List<Object[]> countsByBrand = productRepository.countProductsByBrand();
        return countsByBrand.stream()
                .collect(HashMap::new, (m, v) -> m.put((String) v[0], ((Number) v[1]).longValue()), HashMap::putAll);
    }


    private ProductWithDetailsDto mapToProductWithDetailsDto(Product product) {
        ProductDto productDto = new ProductDto(
                product.getId(),
                product.getWarehouse().getName(),
                product.getProductName(),
                product.getCategory().getName(),
                product.getImage(),
                product.getBrand(),
                product.getActive(),
                product.getDescription(),
                product.getType(),
                product.getPrice()
        );

        List<ProductDetailDto> productDetailDtos = product.getProductdetails().stream()
                .map(this::mapToProductDetailDto)
                .collect(Collectors.toList());

        return new ProductWithDetailsDto(productDto, productDetailDtos);
    }
    private ProductDetailDto mapToProductDetailDto(Productdetail productdetail) {
        ColorDto colorDto = new ColorDto(productdetail.getColor().getId(),productdetail.getColor().getColorCode(), productdetail.getColor().getColorName());
        SizeDto sizeDto;

        if (productdetail.getSize() != null) {
            sizeDto = new SizeDto(productdetail.getSize().getId(), productdetail.getSize().getSizeName());
        } else {
            sizeDto = new SizeDto(null, "");
        }
        return new ProductDetailDto(
                productdetail.getId(),
                productdetail.getProduct().getId(),
                productdetail.getImage(),
                productdetail.getStockQuantity(),
                productdetail.getImportDate(),
                colorDto,
                sizeDto
        );
    }
}
