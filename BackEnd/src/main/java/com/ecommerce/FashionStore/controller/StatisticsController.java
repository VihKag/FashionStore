package com.ecommerce.FashionStore.controller;

import com.ecommerce.FashionStore.entity.Order;
import com.ecommerce.FashionStore.entity.Orderdetail;
import com.ecommerce.FashionStore.entity.Product;
import com.ecommerce.FashionStore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Year;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/revenue")
    public ResponseEntity<Map<String, Object>> getRevenueStatistics(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(required = false) Integer year) {

        List<Order> orders;
        if (year != null) {
            LocalDateTime startOfYear = Year.of(year).atDay(1).atStartOfDay();
            LocalDateTime endOfYear = Year.of(year).atDay(365).atTime(23, 59, 59);
            orders = orderRepository.findByDateBetween(startOfYear, endOfYear);
        } else if (startDate != null && endDate != null) {
            orders = orderRepository.findByDateBetween(startDate, endDate);
        } else {
            orders = orderRepository.findAll();
        }

        double totalRevenue = orders.stream()
                .mapToDouble(Order::getTotalPrice)
                .sum();

        long totalOrders = orders.size();
        Map<String, Map<String, Double>> revenueByCategoryAndMonth = calculateRevenueByCategoryAndMonth(orders);
        Map<String, Object> statistics = new HashMap<>();
        statistics.put("totalRevenue", totalRevenue);
        statistics.put("totalOrders", totalOrders);
        statistics.put("averageOrderValue", totalOrders > 0 ? totalRevenue / totalOrders : 0);
        statistics.put("revenueByCategoryAndMonth", revenueByCategoryAndMonth);
        return ResponseEntity.ok(statistics);
    }

    private Map<String, Map<String, Double>> calculateRevenueByCategoryAndMonth(List<Order> orders) {
        Map<String, Map<String, Double>> revenueByCategoryAndMonth = new HashMap<>();

        for (Order order : orders) {
            String month = order.getDate().getMonth().toString();
            for (Orderdetail detail : order.getOrderdetails()) {
                Product product = detail.getProductDetails().getProduct();
                String category = product.getCategory().getName();
                double revenue = detail.getQuantity() * detail.getUnitPrice();

                revenueByCategoryAndMonth
                        .computeIfAbsent(category, k -> new HashMap<>())
                        .merge(month, revenue, Double::sum);
            }
        }

        return revenueByCategoryAndMonth;
    }
}