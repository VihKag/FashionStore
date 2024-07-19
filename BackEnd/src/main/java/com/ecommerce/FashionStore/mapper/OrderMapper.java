package com.ecommerce.FashionStore.mapper;

import com.ecommerce.FashionStore.dto.*;
import com.ecommerce.FashionStore.entity.*;
import com.ecommerce.FashionStore.repository.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class OrderMapper {
    public OrderDto convertToDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setEmail(order.getUser().getEmail());
        dto.setPhone(order.getUser().getPhone());
        dto.setAddress(order.getAddress());
        dto.setUserId(order.getUser().getId());
        dto.setStatus(order.getStatus());
        dto.setDate(order.getDate());
        dto.setTotalPrice(order.getTotalPrice());

        List<OrderdetailDto> detailDtos = new ArrayList<>();
        for (Orderdetail detail : order.getOrderdetails()) {
            OrderdetailDto detailDto = new OrderdetailDto();
            detailDto.setId(detail.getId());
            detailDto.setProductDetailId(detail.getProductDetails().getId());
            detailDto.setQuantity(detail.getQuantity());
            detailDto.setUnitPrice(detail.getUnitPrice());
            detailDtos.add(detailDto);
        }
        dto.setOrderdetails(detailDtos);

        return dto;
    }

}
