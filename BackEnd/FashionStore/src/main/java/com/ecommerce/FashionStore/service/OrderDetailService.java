package com.ecommerce.FashionStore.service;

import com.ecommerce.FashionStore.dto.OrderdetailDto;
import com.ecommerce.FashionStore.entity.Orderdetail;

public interface OrderDetailService {
//    Orderdetail createOrderDetail(Integer orderId, OrderdetailDto orderdetailDto);
    void deleteOrder(Integer orderId);
}
