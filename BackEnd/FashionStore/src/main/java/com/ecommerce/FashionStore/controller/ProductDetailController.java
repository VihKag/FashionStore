package com.ecommerce.FashionStore.controller;

import com.ecommerce.FashionStore.dto.PriceDto;
import com.ecommerce.FashionStore.dto.ProductDetailDto;
import com.ecommerce.FashionStore.entity.*;
import com.ecommerce.FashionStore.exception.ProductNotFoundException;
import com.ecommerce.FashionStore.mapper.PriceMapper;
import com.ecommerce.FashionStore.mapper.ProductMapper;
import com.ecommerce.FashionStore.repository.*;
import com.ecommerce.FashionStore.service.impl.ProductDetailServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/api/product_detail")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductDetailController {
    private final ProductRepository productRepository;
    private final ColorRepository colorRepository;
    private final SizeRepository sizeRepository;
    private final ProductDetailRepository productDetailRepository;
    private final ProductMapper productMapper;
    private final PriceRepository priceRepository;
    private final PriceMapper priceMapper;
    private final ProductDetailServiceImpl productDetailService;
    public ProductDetailController(ProductRepository productRepository, ColorRepository colorRepository, SizeRepository sizeRepository,
                                   ProductDetailRepository productDetailRepository, ProductMapper productMapper, PriceRepository priceRepository,
                                   PriceMapper priceMapper, ProductDetailServiceImpl productDetailService) {
        this.productRepository = productRepository;
        this.colorRepository = colorRepository;
        this.sizeRepository = sizeRepository;
        this.productDetailRepository = productDetailRepository;
        this.productMapper = productMapper;
        this.priceRepository = priceRepository;
        this.priceMapper = priceMapper;
        this.productDetailService = productDetailService;
    }


    @PostMapping("/create")
    public ResponseEntity<ProductDetailDto> createProductDetail(@RequestBody ProductDetailDto productDetailDto) {
        try {
            Productdetail productdetail = new Productdetail();
            productdetail.setStockQuantity(productDetailDto.getStockQuantity());
            productdetail.setImportDate(productDetailDto.getImportDate());

            // Set product
            Product product = productRepository.findById(productDetailDto.getProductId())
                    .orElseThrow(() -> new ProductNotFoundException("Product not found"));
            productdetail.setProduct(product);

            // Set color
            Color color = colorRepository.findById(productDetailDto.getColor().getId())
                    .orElseThrow(() -> new RuntimeException("Color not found"));
            productdetail.setColor(color);

            // Set size
            Size size = sizeRepository.findById(productDetailDto.getSize().getId())
                    .orElseThrow(() -> new RuntimeException("Size not found"));
            productdetail.setSize(size);

            Productdetail savedProductDetail = productDetailRepository.save(productdetail);
            ProductDetailDto responseDto = productMapper.convertToProductDetailDto(savedProductDetail);
            return ResponseEntity.ok(responseDto);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductDetailDto> updateProductDetail(@PathVariable String id, @RequestBody ProductDetailDto productDetailDto) {
        try {
            Productdetail existingProductDetail = productDetailRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("ProductDetail not found"));

            existingProductDetail.setStockQuantity(productDetailDto.getStockQuantity());

            // Update product
            if (productDetailDto.getProductId() != null) {
                Product product = productRepository.findById(productDetailDto.getProductId())
                        .orElseThrow(() -> new ProductNotFoundException("Product not found"));
                existingProductDetail.setProduct(product);
            }

            // Update color
            if (productDetailDto.getColor() != null && productDetailDto.getColor().getId() != null) {
                Color color = colorRepository.findById(productDetailDto.getColor().getId())
                        .orElseThrow(() -> new RuntimeException("Color not found"));
                existingProductDetail.setColor(color);
            }

            // Update size
            if (productDetailDto.getSize() != null && productDetailDto.getSize().getId() != null) {
                Size size = sizeRepository.findById(productDetailDto.getSize().getId())
                        .orElseThrow(() -> new RuntimeException("Size not found"));
                existingProductDetail.setSize(size);
            }

            Productdetail updatedProductDetail = productDetailRepository.save(existingProductDetail);
            ProductDetailDto responseDto = productMapper.convertToProductDetailDto(updatedProductDetail);

            return ResponseEntity.ok(responseDto);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProductDetail(@PathVariable String id) {
        try {
            Productdetail existingProductDetail = productDetailRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("ProductDetail not found with ID: " + id));

            productDetailRepository.delete(existingProductDetail);

            return ResponseEntity.noContent().build();
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/update/{productDetailId}/prices/{priceId}")
    public ResponseEntity<PriceDto> updatePrice(@PathVariable String productDetailId, @PathVariable Integer priceId, @RequestBody PriceDto priceDto) {
        try {
            Productdetail productDetail = productDetailRepository.findById(productDetailId)
                    .orElseThrow(() -> new RuntimeException("ProductDetail not found with ID: " + productDetailId));

            Price existingPrice = priceRepository.findById(priceId)
                    .orElseThrow(() -> new RuntimeException("Price not found with ID: " + priceId));

            existingPrice.setPurchase(priceDto.getPurchase());
            existingPrice.setSelling(priceDto.getSelling());
            existingPrice.setUpdate(Instant.now());

            Price updatedPrice = priceRepository.save(existingPrice);
            PriceDto responseDto = priceMapper.mapToPriceDto(updatedPrice);

            return ResponseEntity.ok(responseDto);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<?> getProductDetailByProductColorAndSize(
            @RequestParam String productId,
            @RequestParam Integer colorId,
            @RequestParam Integer sizeId) {
        ProductDetailDto productDetail = productDetailService.getProductDetailByProductColorAndSize(productId, colorId, sizeId);
        return ResponseEntity.ok(productDetail);
    }

}
