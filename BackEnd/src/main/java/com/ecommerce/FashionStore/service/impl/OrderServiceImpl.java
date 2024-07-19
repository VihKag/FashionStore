package com.ecommerce.FashionStore.service.impl;

import com.ecommerce.FashionStore.dto.OrderDto;
import com.ecommerce.FashionStore.dto.OrderWithUserDto;
import com.ecommerce.FashionStore.dto.OrderdetailDto;
import com.ecommerce.FashionStore.dto.UserDto;
import com.ecommerce.FashionStore.entity.*;
import com.ecommerce.FashionStore.mapper.OrderMapper;
import com.ecommerce.FashionStore.repository.*;
import com.ecommerce.FashionStore.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    private static final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final OrderDetailRepository orderDetailRepository;
    private final UserRepository userRepository;
    private final ProductDetailRepository productDetailRepository;
    private final BillRepository billRepository;
    public OrderServiceImpl(OrderRepository orderRepository, OrderDetailRepository orderDetailRepository, OrderMapper orderMapper, UserRepository userRepository,
                            ProductDetailRepository productDetailRepository, BillRepository billRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.orderMapper = orderMapper;
        this.userRepository = userRepository;
        this.productDetailRepository = productDetailRepository;
        this.billRepository = billRepository;
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
        order.setDate(LocalDateTime.now());
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
        orderDetailRepository.deleteAll(order.getOrderdetails());
        List<Bill> bills = billRepository.findByOrder(order); // Giả sử bạn có phương thức này trong BillRepository
        billRepository.deleteAll(bills);
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
    public Page<OrderDto> getOrdersByFilters(String userId, String status, LocalDateTime startDate, LocalDateTime endDate, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> ordersPage = orderRepository.findByFilters(userId, status, startDate, endDate, pageable);
        return ordersPage.map(orderMapper::convertToDto);
    }

    @Override
    public OrderDto changeOrderStatus(Integer orderId, String status) {
        try{
            Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
            order.setStatus(status);
            order = orderRepository.save(order);
            return orderMapper.convertToDto(order);
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public OrderWithUserDto getOrderWithUser(int orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        User user = userRepository.findById(order.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Orderdetail> orderDetails = orderDetailRepository.findByOrderId(orderId);
        OrderWithUserDto orderWithUserDto = new OrderWithUserDto();
        // Map Order to OrderDto
        BeanUtils.copyProperties(order, orderWithUserDto);
        // Map User to UserDto
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(user, userDto);

        // Map OrderDetails to OrderDetailDto
        List<OrderdetailDto> orderDetailDtos = orderDetails.stream()
                .map(this::convertToOrderDetailDto)
                .collect(Collectors.toList());

        orderWithUserDto.setUser(userDto);
        orderWithUserDto.setOrderdetails(orderDetailDtos);
        return orderWithUserDto;
    }
    private OrderdetailDto convertToOrderDetailDto(Orderdetail orderDetail) {
        OrderdetailDto dto = new OrderdetailDto();
        dto.setId(orderDetail.getId());
        dto.setProductDetailId(orderDetail.getProductDetails().getId());
        dto.setQuantity(orderDetail.getQuantity());
        dto.setUnitPrice(orderDetail.getUnitPrice());
        return dto;
    }
}
