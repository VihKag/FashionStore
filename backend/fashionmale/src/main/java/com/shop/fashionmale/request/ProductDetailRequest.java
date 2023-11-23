package com.shop.fashionmale.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shop.fashionmale.model.*;

import javax.persistence.*;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

public class ProductDetaildto {
    private String productdetailId;
    private Warehouse warehouse;

    private Product product;

    private Integer stockQuantity;

    private Instant importDate;
    private Long size;
    private Long color;

    private String linkImage;

    private float priceSelling;
}
