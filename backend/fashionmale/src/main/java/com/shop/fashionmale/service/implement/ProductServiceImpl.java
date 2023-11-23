package com.shop.fashionmale.service.Implement;

import com.shop.fashionmale.model.Price;
import com.shop.fashionmale.model.Product;
import com.shop.fashionmale.model.Productdetail;
import com.shop.fashionmale.repository.*;
import com.shop.fashionmale.request.ProductDetailRequest;
import com.shop.fashionmale.request.ProductRequest;
import com.shop.fashionmale.service.IProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements IProductService {
    @Autowired
    IProductRepository productRepository;
    @Autowired
    IProductDetailRepository productDetailRepository;
    @Autowired
    IColorRepository colorRepository;
    @Autowired
    CategoryServiceImpl categoryService;
    @Autowired
    ISizeRepository sizeRepository;
    @Autowired
    IPriceRepository priceRepository;
    @Autowired
    IWarehouseRepository warehouseRepository;


    @Override
    public List<Product> findProductByCategoryCategoryName(String category) {
        return productRepository.findProductByCategoryCategoryName(category);
    }


    @Override
    public List<Product> searchProductByProductName(String name) {
        return productRepository.searchProductByProductName(name);
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Boolean existsProductByProductId(String id) {
        return productRepository.existsProductByProductId(id);
    }

    @Override
    public Optional<Product> findProductByProductId(String id) {
        return productRepository.findById(id);
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public void addProduct(ProductRequest productRequest) {
        Product product = new Product();
        if(productRequest.getProductId() != null){
            product.updateFromProductRequest(productRequest);
            product.setCategory(categoryService.findCategoryByCategoryName(productRequest.getCategory()));
            productRepository.save(product);
        }
        if (productRequest.getProductdetails() != null) {
            for (ProductDetailRequest productDetailRequest : productRequest.getProductdetails()) {
                Productdetail productDetail = new Productdetail();
                productDetail.updateFromProductDetailRequest(productDetailRequest);
                productDetail.setSize(sizeRepository.findById(productDetailRequest.getSize()).get());
                productDetail.setColor(colorRepository.findById(productDetailRequest.getColor()).get());
                productDetail.setWarehouse(warehouseRepository.findById(productDetailRequest.getWarehouseId()).get());
                Price price = new Price();
                price.setPurchasePrice(productDetailRequest.getPurchasePrice());
                price.setProductdetail(productDetail);
                price.setUpdateDate(Instant.now());
                productDetail.getPrices().add(price);
                productDetail.setProduct(product);
                productDetailRepository.save(productDetail);
                priceRepository.save(price);
            }
        }

    }

    @Override
    public Page<ProductRequest> getInventories(Pageable pageable) {
        Page<Product> products = productRepository.findAll(pageable);
        List<ProductRequest> productRequestsList = products.getContent().stream()
                .map(product -> {
                    ProductRequest productRequest = new ProductRequest();
                    productRequest.updateFormProduct(product);
                    return productRequest;
                })
                .collect(Collectors.toList());
        Page<ProductRequest> productRequests = new PageImpl<>(productRequestsList, pageable, products.getTotalElements());

        return productRequests;
    }

}
