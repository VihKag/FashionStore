package com.shop.fashionmale.service.Implement;

import com.shop.fashionmale.repository.ICustomerRepository;
import com.shop.fashionmale.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements ICustomerService {
    @Autowired
    ICustomerRepository customerRepository;

    @Override
    public void deleteById(String id) {
        customerRepository.deleteById(id);
    }
}
