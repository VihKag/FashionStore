package com.ecommerce.FashionStore.mapper;

import com.ecommerce.FashionStore.dto.PriceDto;
import com.ecommerce.FashionStore.entity.Price;
import org.springframework.stereotype.Component;

@Component
public class PriceMapper {
    public PriceDto mapToPriceDto(Price price) {
        return new PriceDto(price.getId(), price.getPurchase(), price.getSelling());
    }
}
