package com.shop.fashionmale.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "`order`")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Customerprofile user;

    @Column(name = "total_price")
    private Float totalPrice;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name = "order_status")
    private String orderStatus;

    @Lob
    @Column(name = "order_address")
    private String orderAddress;

    @OneToMany(mappedBy = "order")
    private Set<Bill> bills = new LinkedHashSet<>();

    @OneToMany(mappedBy = "order")
    private Set<Orderdetail> orderdetails = new LinkedHashSet<>();

}