package com.ecommerce.FashionStore.service;

import com.ecommerce.FashionStore.dto.OrderDto;
import com.ecommerce.FashionStore.dto.OrderWithUserDto;
import com.ecommerce.FashionStore.dto.OrderdetailDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.Map;

public interface OrderService {
    OrderDto createOrder(OrderDto orderDTO);
    void deleteOrder(Integer orderId);
//    Page<OrderDto> getOrders(Pageable pageable);
    long getTotalOrderCount();
    Map<String, Long> getOrderCountByStatus();
    Page<OrderDto> getOrdersByFilters(String userId, String status, LocalDateTime startDate, LocalDateTime endDate, int page, int size);
    OrderDto changeOrderStatus(Integer orderId, String status);
    OrderWithUserDto getOrderWithUser(int orderId);
}
