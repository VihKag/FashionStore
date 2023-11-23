package com.shop.fashionmale.service.Implement;

import com.shop.fashionmale.model.Size;
import com.shop.fashionmale.repository.ISizeRepository;
import com.shop.fashionmale.service.ISizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeServiceImpl implements ISizeService {
    @Autowired
    ISizeRepository sizeRepository;
    @Override
    public Size getSizeBySizeName(String sizeName) {
        return sizeRepository.findSizeBySizeName(sizeName);
    }
    public List<Size> getListSize(){
        return sizeRepository.findAll();
    }
}
