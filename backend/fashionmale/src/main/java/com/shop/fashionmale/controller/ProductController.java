package com.shop.fashionmale.controller;

import com.cloudinary.utils.ObjectUtils;
import com.shop.fashionmale.model.*;
import com.shop.fashionmale.repository.IProductDetailRepository;
import com.shop.fashionmale.request.CategoryRequest;
import com.shop.fashionmale.request.ProductDetailRequest;
import com.shop.fashionmale.request.ProductRequest;
import com.shop.fashionmale.response.ResponseMessage;
import com.shop.fashionmale.security.jwt.JwtProvider;
import com.shop.fashionmale.security.jwt.JwtTokenFilter;
import com.shop.fashionmale.service.Implement.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.cloudinary.*;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "dcpkx8z5p",
            "api_key", "466928559467251",
            "api_secret", "lTTnUKkD9cIJqzsSxdvxURv9H_8"));
    @Autowired
    ProductServiceImpl productService;
    @Autowired
    ProductDetailServiceImpl productDetailService;
    @Autowired
    JwtProvider jwtProvider;
    @Autowired
    JwtTokenFilter jwtTokenFilter;
    @Autowired
    UserServiceImpl userService;
    @Autowired
    CategoryServiceImpl categoryService;
    @Autowired
    WarehouseServiceImpl warehouseService;
    @Autowired
    ColorServiceImpl colorService;
    @Autowired
    SizeServiceImpl sizeService;
    @Autowired
    IProductDetailRepository productDetailRepository;

    @GetMapping("/search")
    public ResponseEntity<?>  searchProductByName(@RequestParam String search){
        List<Product> products = productService.searchProductByProductName(search);
        if(products.isEmpty()){
            return new ResponseEntity<>(new ResponseMessage("Not founded"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    // đưa về categorycontroller
    @GetMapping("/{category}")
    public ResponseEntity<?> findProductsByCategoryName(@PathVariable String category){
        List<Product> products = productService.findProductByCategoryCategoryName(category);
        if(products.isEmpty()){
            return new ResponseEntity<>(new ResponseMessage("Not founded"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    // Tạo sản phẩm đưa vào kho để lưu trữ
    @PostMapping("/create")
    public ResponseEntity<?> createProduct(HttpServletRequest request, @Valid @RequestBody ProductRequest productRequest){
        try{
            productService.addProduct(productRequest);
            return new ResponseEntity<>("Product added successfully", HttpStatus.CREATED);
        }catch (Exception e) {
            return new ResponseEntity<>("Error adding product: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
//    sửa lại chi tiết hơn
    @PutMapping("/{productId}/update")
    public ResponseEntity<?> updateProduct(HttpServletRequest request,@PathVariable String productId, @Valid @RequestBody ProductRequest productRequest) {
        try {
            String jwt = jwtTokenFilter.getJwt(request);
            String username = jwtProvider.getUserNameFromToken(jwt);
            User user = userService.findUserByUsername(username).orElseThrow(()-> new Exception("Username or password not found"));
            Product product = productService.findProductByProductId(productId).orElseThrow(()-> new Exception("Not found product!"));
            product.setProductName(productRequest.getProductName());
            product.setBrand(productRequest.getBrand());
            product.setDescription(productRequest.getDescription());
            productService.save(product);
            return new ResponseEntity<>(new ResponseMessage("Update product successful!!!"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.EXPECTATION_FAILED);
        }
    }

    //pages products
    @GetMapping()
    public ResponseEntity<?> getProductPages(@PageableDefault(sort = "productName", direction = Sort.Direction.ASC) Pageable pageable){
        Page<ProductRequest> productPage = productService.getInventories(pageable);
        if(productPage.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }

    //pages prodetails
    @GetMapping("/details")
    public ResponseEntity<?> getProductDetailPages(@PageableDefault(sort = "productdetailId", direction = Sort.Direction.ASC) Pageable pageable){
        Page<ProductDetailRequest> productPage = productDetailService.getInventoryDetail(pageable);
        if(productPage.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productPage, HttpStatus.OK);
    }
    @GetMapping("/size")
    public ResponseEntity<List<Size>> listSize(){
        List<Size> listSize = sizeService.getListSize();
        if(listSize.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>( listSize, HttpStatus.OK);
    }
    @GetMapping("/color")
    public ResponseEntity<List<Color>> listColor(){
        List<Color> listColor = colorService.getListColor();
        if(listColor.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(listColor, HttpStatus.OK);
    }
    @GetMapping("/category")
    public ResponseEntity<List<CategoryRequest>> listCategory(){
        List<Category> list = categoryService.getListCategory();
        List<CategoryRequest> listCategory = new ArrayList<>();
        for(Category category : list){
            CategoryRequest request = new CategoryRequest();
            request.updateFromCategory(category);
            listCategory.add(request);
        }
        if(listCategory.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(listCategory, HttpStatus.OK);
    }
    @PutMapping("/details/{productDetailId}/update")
    public ResponseEntity<?> updateProductDetail(@RequestBody ProductDetailRequest request,
                                                      @PathVariable String productDetailId,
                                                      @RequestParam("imageFile") MultipartFile imageFile) throws IOException{
        Productdetail productdetail = productDetailRepository.findById(request.getProductdetailId()).orElseThrow(() -> new RuntimeException());

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
