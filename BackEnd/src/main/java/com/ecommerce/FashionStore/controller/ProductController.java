package com.ecommerce.FashionStore.controller;

import com.ecommerce.FashionStore.dto.ProductDto;
import com.ecommerce.FashionStore.dto.ProductWithDetailsDto;
import com.ecommerce.FashionStore.entity.Category;
import com.ecommerce.FashionStore.entity.Product;
import com.ecommerce.FashionStore.entity.Productdetail;
import com.ecommerce.FashionStore.entity.Warehouse;
import com.ecommerce.FashionStore.exception.ProductNotFoundException;
import com.ecommerce.FashionStore.mapper.ProductMapper;
import com.ecommerce.FashionStore.repository.CategoryRepository;
import com.ecommerce.FashionStore.repository.ProductDetailRepository;
import com.ecommerce.FashionStore.repository.ProductRepository;
import com.ecommerce.FashionStore.repository.WarehouseRepository;
import com.ecommerce.FashionStore.service.CloudinaryService;
import com.ecommerce.FashionStore.service.impl.ProductServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@Slf4j
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {
    private final ProductRepository productRepository;
    private final ProductDetailRepository productDetailRepository;
    private final ProductMapper productMapper;
    private final ProductServiceImpl productService;
    private final CloudinaryService cloudinaryService;
    private final CategoryRepository categoryRepository;
    private final WarehouseRepository warehouseRepository;
    public ProductController(ProductRepository productRepository, ProductDetailRepository productDetailRepository, ProductMapper productMapper,
                             ProductServiceImpl productService, CloudinaryService cloudinaryService, CategoryRepository categoryRepository, WarehouseRepository warehouseRepository) {
        this.productRepository = productRepository;
        this.productDetailRepository = productDetailRepository;
        this.productMapper = productMapper;
        this.productService = productService;
        this.cloudinaryService = cloudinaryService;
        this.categoryRepository = categoryRepository;
        this.warehouseRepository = warehouseRepository;
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductWithDetailsDto> getProductWithDetails(@PathVariable String productId) {
        try{
            // Lấy thông tin sản phẩm và chi tiết từ cơ sở dữ liệu
            Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
            List<Productdetail> productDetails = productDetailRepository.findByProductId(productId);

            // Chuyển đổi thông tin sang DTO
            ProductWithDetailsDto dto = new ProductWithDetailsDto();
            dto.setProductDto(productMapper.convertToProductDto(product));
            dto.setProductDetailDto(productDetails.stream()
                    .map(productMapper::convertToProductDetailDto)
                    .collect(Collectors.toList()));

            return ResponseEntity.ok(dto);
        }
        catch (Exception e) {
            // Return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/type/{type}")
    public ResponseEntity<?> getProductByType(@PathVariable String type){
        try {
            List<Product> products = productRepository.findByType(type);
            List<ProductWithDetailsDto> productWithDetailsDtos = products.stream()
                    .map(product -> {
                        ProductWithDetailsDto dto = new ProductWithDetailsDto();
                        dto.setProductDto(productMapper.convertToProductDto(product));
                        List<Productdetail> productDetails = productDetailRepository.findByProductId(product.getId());
                        dto.setProductDetailDto(productDetails.stream()
                                .map(productMapper::convertToProductDetailDto)
                                .collect(Collectors.toList()));
                        return dto;
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.ok(productWithDetailsDtos);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
    }

    @GetMapping("/pages")
    public ResponseEntity<Page<ProductWithDetailsDto>> getActiveProducts(
            @RequestParam(value = "categoryId", required = false) String categoryId,
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "minPrice", defaultValue = "0") double minPrice,
            @RequestParam(value = "maxPrice", defaultValue = "100000000") double maxPrice,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        try{
            Page<ProductWithDetailsDto> products = productService.getAllActiveProducts(categoryId, searchValue, minPrice, maxPrice, page, size);
            return ResponseEntity.ok(products);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Page<ProductWithDetailsDto>> getAllProducts(
            @RequestParam(value = "categoryId", required = false) String categoryId,
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        try{
            Page<ProductWithDetailsDto> products = productService.getAllProducts(categoryId, searchValue, page, size);
            return ResponseEntity.ok(products);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestPart("image") MultipartFile image,
                                                 @RequestPart ("product") ProductDto productRequest) throws IOException {
        log.info("Received request to create product. Image present: {}", image != null);
        log.info("Product details: {}", productRequest);
        String imageUrl = cloudinaryService.uploadImage(image);
        Product product = new Product();
        product.setId(productRequest.getId());
        product.setProductName(productRequest.getProductName());
        product.setBrand(productRequest.getBrand());
        product.setActive(productRequest.isActive());
        product.setDescription(productRequest.getDescription());

        // Set warehouse and category properties
//        Warehouse warehouse = warehouseRepository.findByName(productRequest.getWarehouseName());
        Warehouse warehouse = warehouseRepository.findByName("Kho hàng linh Trung");
        product.setWarehouse(warehouse);

        Category category = categoryRepository.findByName(productRequest.getCategoryName());
        product.setCategory(category);

        // Set image URL
        product.setImage(imageUrl);

        Product savedProduct = productRepository.save(product);
        return ResponseEntity.ok(savedProduct);
    }



    @PatchMapping("/update/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable String productId,
                                                 @RequestPart(value = "image", required = false) MultipartFile image,
                                                 @RequestPart("product") ProductDto request) throws IOException {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with ID: " + productId));

        // Update product properties
        if (image != null && !image.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(image);
            existingProduct.setImage(imageUrl);
        }
        // Update other product properties
        if (request.getWarehouseName() != null) {
            Warehouse warehouse = warehouseRepository.findByName(request.getWarehouseName());
            existingProduct.setWarehouse(warehouse);
        }
        if (request.getProductName() != null) {
            existingProduct.setProductName(request.getProductName());
        }
        if (request.getCategoryName() != null) {
            Category category = categoryRepository.findByName(request.getCategoryName());
            existingProduct.setCategory(category);
        }
        if (request.getImage() != null) {
            existingProduct.setImage(request.getImage());
        }
        if (request.getBrand() != null) {
            existingProduct.setBrand(request.getBrand());
        }
        existingProduct.setActive(request.isActive());
        if (request.getDescription() != null) {
            existingProduct.setDescription(request.getDescription());
        }

        Product updatedProduct = productRepository.save(existingProduct);
        return ResponseEntity.ok(updatedProduct);
    }

    @GetMapping("/statistics")
    public ResponseEntity<?> getProductStatistics() {
        Map<String, Object> statistics = new HashMap<>();
        statistics.put("totalProducts", productService.getTotalProductCount());
        statistics.put("totalActiveProducts", productService.countActiveProducts());
        statistics.put("productsByCategory", productService.getProductCountByCategory());
        statistics.put("productsByBrand", productService.getProductCountByBrand());
        return ResponseEntity.ok(statistics);
    }


}
