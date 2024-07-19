package com.ecommerce.FashionStore.repository;

import com.ecommerce.FashionStore.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT o.status, COUNT(o) FROM Order o GROUP BY o.status")
    List<Object[]> countOrdersByStatus();
    long count();
    @Query("SELECT o FROM Order o WHERE " +
            "(:userId IS NULL OR o.user.id = :userId) AND " +
            "(:status IS NULL OR o.status = :status) AND " +
            "(:startDate IS NULL OR o.date >= :startDate) AND " +
            "(:endDate IS NULL OR o.date <= :endDate)")
    Page<Order> findByFilters(
            @Param("userId") String userId,
            @Param("status") String status,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable
    );
    @Query("SELECT o FROM Order o WHERE o.date BETWEEN :startDate AND :endDate AND o.status ='completed'")
    List<Order> findByDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}
