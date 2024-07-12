package com.ecommerce.FashionStore.dto;

import com.ecommerce.FashionStore.entity.Color;
import com.ecommerce.FashionStore.entity.Size;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailDto {
    private String id;
    private String productId;
    private String image;
    private Integer stockQuantity;
    private Instant importDate;
    private ColorDto color;
    private SizeDto size;
}
