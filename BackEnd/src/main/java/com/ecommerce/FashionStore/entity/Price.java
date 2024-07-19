package com.ecommerce.FashionStore.entity;

import com.ecommerce.FashionStore.entity.Productdetail;
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
@Table(name = "price")
public class Price {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productDetails_id")
    private Productdetail productDetails;

    @Column(name = "purchase")
    private Float purchase;

    @Column(name = "selling")
    private Float selling;

    @Column(name = "`update`")
    private LocalDateTime update;

}