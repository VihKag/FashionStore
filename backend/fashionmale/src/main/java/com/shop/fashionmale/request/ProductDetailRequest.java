package com.shop.fashionmale.request;

import com.shop.fashionmale.model.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailRequest {
    private String productdetailId;
    private String warehouseId;

    private Product product;

    private Integer stockQuantity;

    private Instant importDate;
    private Integer size;
    private Integer color;
    private String sizeName;
    private String colorName;
    private Float purchasePrice;
    private  Float priceSelling;

    private List<Imageproduct> imageProducts;
    private Set<Price> prices;

    public void updateFromProductDetail(Productdetail productdetail){
        this.setProductdetailId(productdetail.getProductdetailId());
        this.setWarehouseId(productdetail.getWarehouse().getWarehouseId());
        this.setStockQuantity(productdetail.getStockQuantity());
        this.setImportDate(Instant.now());
        this.setColor(productdetail.getColor().getId());
        this.setSize(productdetail.getSize().getId());
        this.setSizeName(productdetail.getSize().getSizeName());
        this.setColorName(productdetail.getColor().getColorName());
        if (this.getPrices() == null) {
            this.setPrices(new HashSet<>());
        }
        if (productdetail.getPrices() != null) {
            this.getPrices().addAll(productdetail.getPrices());
        }
    }
}
