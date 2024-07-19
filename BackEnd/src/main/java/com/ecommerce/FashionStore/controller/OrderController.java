package com.ecommerce.FashionStore.controller;

import com.ecommerce.FashionStore.dto.OrderDto;
import com.ecommerce.FashionStore.dto.OrderWithUserDto;
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

import java.time.LocalDateTime;
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

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderWithUserDto> getOrderWithUser(@PathVariable Integer orderId) {
        OrderWithUserDto orderWithUserDto = orderService.getOrderWithUser(orderId);
        return ResponseEntity.ok(orderWithUserDto);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok().body("Order deleted successfully");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestPart String status) {
        try{
            OrderDto orderDto= orderService.changeOrderStatus(id,status);
            return ResponseEntity.ok().body(orderDto);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody OrderDto orderDto) {
        OrderDto createdOrder = orderService.createOrder(orderDto);
        return ResponseEntity.ok(createdOrder);
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
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return orderService.getOrdersByFilters(userId, status, startDate, endDate, page, size);
    }
    
}
