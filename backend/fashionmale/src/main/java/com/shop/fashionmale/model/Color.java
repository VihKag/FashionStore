package com.shop.fashionmale.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "colors")
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ColorID", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "ColorName", nullable = false)
    private String colorName;

    @Size(max = 10)
    @Column(name = "ColorCode", nullable = true, length = 10)
    private String colorCode;

}