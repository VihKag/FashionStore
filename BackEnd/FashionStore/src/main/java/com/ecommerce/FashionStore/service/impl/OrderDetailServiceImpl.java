package com.ecommerce.FashionStore.service.impl;

import com.ecommerce.FashionStore.dto.OrderdetailDto;
import com.ecommerce.FashionStore.entity.Order;
import com.ecommerce.FashionStore.entity.Orderdetail;
import com.ecommerce.FashionStore.mapper.OrderMapper;
import com.ecommerce.FashionStore.repository.OrderDetailRepository;
import com.ecommerce.FashionStore.repository.OrderRepository;
import com.ecommerce.FashionStore.service.OrderDetailService;
import com.ecommerce.FashionStore.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    private final OrderDetailRepository orderDetailRepository;
    private final OrderMapper orderMapper;
    private final OrderRepository orderRepository;
    public OrderDetailServiceImpl(OrderDetailRepository orderDetailRepository, OrderMapper orderMapper, OrderRepository orderRepository) {
        this.orderDetailRepository = orderDetailRepository;
        this.orderMapper = orderMapper;
        this.orderRepository = orderRepository;
    }

    @Override
    public void deleteOrder(Integer orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        // Xóa các OrderDetail liên quan
        Set<Orderdetail> orderdetails = order.getOrderdetails();
        orderDetailRepository.deleteAll(orderdetails);

        // Xóa Order
        orderRepository.delete(order);
    }

}
