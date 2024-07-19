package com.ecommerce.FashionStore.entity;

import com.ecommerce.FashionStore.entity.Order;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "bill")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "money")
    private Float money;

    @Column(name = "pay_method")
    private String payMethod;

    @Column(name = "pay_date")
    private LocalDateTime payDate;


    public Bill(Integer id, String userId, Float money, String payMethod, LocalDateTime payDate) {
        this.id = id;
        this.userId = userId;
        this.money = money;
        this.payMethod = payMethod;
        this.payDate = payDate;
    }
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id") // mappedBy trỏ đến tên thuộc tính trong Order entity
    private Order order;

}