package com.ecommerce.FashionStore.dto;

import com.ecommerce.FashionStore.entity.Order;
import com.ecommerce.FashionStore.entity.Product;
import com.ecommerce.FashionStore.entity.Productdetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderdetailDto {
    private Integer id;
    private String productDetailId;
    private Integer quantity;
    private Float unitPrice;
}
