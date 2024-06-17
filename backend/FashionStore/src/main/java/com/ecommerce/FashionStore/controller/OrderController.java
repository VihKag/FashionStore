package com.ecommerce.FashionStore.controller;

import com.ecommerce.FashionStore.dto.OrderDto;
import com.ecommerce.FashionStore.dto.OrderdetailDto;
import com.ecommerce.FashionStore.entity.Order;
import com.ecommerce.FashionStore.entity.Orderdetail;
import com.ecommerce.FashionStore.mapper.OrderMapper;
import com.ecommerce.FashionStore.repository.OrderDetailRepository;
import com.ecommerce.FashionStore.repository.OrderRepository;
import com.ecommerce.FashionStore.service.OrderService;
import com.ecommerce.FashionStore.service.impl.OrderDetailServiceImpl;
import com.ecommerce.FashionStore.service.impl.OrderServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderdetailRepository;
    private final OrderServiceImpl orderService;
    private final OrderDetailServiceImpl orderDetailService;
    public OrderController(OrderRepository orderRepository, OrderDetailRepository orderdetailRepository, OrderServiceImpl orderService, OrderDetailServiceImpl orderDetailService) {
        this.orderRepository = orderRepository;
        this.orderdetailRepository = orderdetailRepository;
        this.orderService = orderService;
        this.orderDetailService = orderDetailService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody OrderDto orderDto) {
        OrderDto createdOrder = orderService.createOrder(orderDto);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getOrderStatistics() {
        Map<String, Object> statistics = new HashMap<>();
        statistics.put("totalOrders", orderService.getTotalOrderCount());
        statistics.put("ordersByStatus", orderService.getOrderCountByStatus());
        return ResponseEntity.ok(statistics);
    }
    @GetMapping("/page")
    public Page<OrderDto> getOrders(
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant endDate,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return orderService.getOrdersByFilters(userId, status, startDate, endDate, page, size);
    }
    
}
