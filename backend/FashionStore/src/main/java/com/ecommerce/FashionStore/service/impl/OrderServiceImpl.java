package com.ecommerce.FashionStore.service.impl;

import com.ecommerce.FashionStore.dto.OrderDto;
import com.ecommerce.FashionStore.dto.OrderdetailDto;
import com.ecommerce.FashionStore.entity.Order;
import com.ecommerce.FashionStore.entity.Orderdetail;
import com.ecommerce.FashionStore.entity.Productdetail;
import com.ecommerce.FashionStore.entity.User;
import com.ecommerce.FashionStore.mapper.OrderMapper;
import com.ecommerce.FashionStore.repository.*;
import com.ecommerce.FashionStore.service.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final OrderDetailRepository orderDetailRepository;
    private final UserRepository userRepository;
    private final ProductDetailRepository productDetailRepository;
    public OrderServiceImpl(OrderRepository orderRepository, OrderDetailRepository orderDetailRepository, OrderMapper orderMapper, UserRepository userRepository,
                            ProductDetailRepository productDetailRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.orderMapper = orderMapper;
        this.userRepository = userRepository;
        this.productDetailRepository = productDetailRepository;
    }

    @Transactional
    @Override
    public OrderDto createOrder(OrderDto orderDto) {
//        User user = userRepository.findById(orderDto.getUserId())
//                .orElseThrow(() -> new RuntimeException("User not found"));
        User user = userRepository.findByEmail(orderDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Order order = new Order();
        order.setAddress(orderDto.getAddress());
        order.setUser(user);
        order.setStatus(orderDto.getStatus());
        order.setDate(Instant.now());
        order.setTotalPrice(0f);

        order = orderRepository.save(order);

        List<Orderdetail> orderdetails = new ArrayList<>();
        for (OrderdetailDto detailDto : orderDto.getOrderdetails()) {
            Productdetail productDetail = productDetailRepository.findById(detailDto.getProductDetailId())
                    .orElseThrow(() -> new RuntimeException("Product detail not found"));

            Orderdetail orderdetail = new Orderdetail();
            orderdetail.setOrder(order);
            orderdetail.setProductDetails(productDetail);
            orderdetail.setQuantity(detailDto.getQuantity());
            orderdetail.setUnitPrice(detailDto.getUnitPrice());

            orderdetail = orderDetailRepository.save(orderdetail);
            orderdetails.add(orderdetail);

            order.setTotalPrice(order.getTotalPrice() + (orderdetail.getQuantity() * orderdetail.getUnitPrice()));
        }

        order.setOrderdetails(new LinkedHashSet<>(orderdetails));
        order = orderRepository.save(order);

        return orderMapper.convertToDto(order);
    }

    @Override
    public void deleteOrder(Integer orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        orderRepository.delete(order);
    }

    @Override
    public long getTotalOrderCount() {
        return orderRepository.count();
    }

    @Override
    public Map<String, Long> getOrderCountByStatus() {
        List<Object[]> results = orderRepository.countOrdersByStatus();
        Map<String, Long> orderCountByStatus = new HashMap<>();

        for (Object[] result : results) {
            String status = (String) result[0];
            Long count = (Long) result[1];
            orderCountByStatus.put(status, count);
        }

        return orderCountByStatus;
    }

    @Override
    public Page<OrderDto> getOrdersByFilters(String userId, String status, Instant startDate, Instant endDate, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> ordersPage = orderRepository.findByFilters(userId, status, startDate, endDate, pageable);
        return ordersPage.map(orderMapper::convertToDto);
    }
}
