package com.shop.fashionmale.service.Implement;

import com.shop.fashionmale.model.Color;
import com.shop.fashionmale.repository.IColorRepository;
import com.shop.fashionmale.service.IColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorServiceImpl implements IColorService {
    @Autowired
    IColorRepository colorRepository;
    @Override
    public Color getColorByColorName(String colorName) {
        return colorRepository.findColorByColorName(colorName);
    }
    public List<Color> getListColor(){
        return colorRepository.findAll();
    }
}
