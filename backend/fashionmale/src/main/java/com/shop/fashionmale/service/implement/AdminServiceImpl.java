package com.shop.fashionmale.service.Implement;

import com.shop.fashionmale.repository.IAdminRepository;
import com.shop.fashionmale.service.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements IAdminService {
    @Autowired
    IAdminRepository adminRepository;

    @Override
    public void deleteById(String id) {
        adminRepository.deleteById(id);
    }
}
