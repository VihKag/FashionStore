package com.shop.fashionmale.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sizes")
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SizeID", nullable = false)
    private Integer id;

    @javax.validation.constraints.Size(max = 10)
    @NotNull
    @Column(name = "SizeName", nullable = false, length = 10)
    private String sizeName;

    @Column(name = "SizeDescription", nullable = true)
    private String sizeDescription;

}