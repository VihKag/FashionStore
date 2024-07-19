package com.ecommerce.FashionStore.dto;

import com.ecommerce.FashionStore.entity.Bill;
import com.ecommerce.FashionStore.entity.Orderdetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    private Integer id;
    private String address;
    private String userId;
    private String email;
    private String phone;
    private String status;
    private LocalDateTime date;
    private Float totalPrice;
    private List<OrderdetailDto> orderdetails;
}
