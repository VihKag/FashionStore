package com.ecommerce.FashionStore.dto;

import com.ecommerce.FashionStore.entity.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BillDto {
    private Integer id;
    private String userId;
    private Float money;
    private String payMethod;
    private LocalDateTime payDate;
    private Order order;
}
