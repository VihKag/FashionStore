package com.shop.fashionmale.service.Implement;

import com.shop.fashionmale.model.Customerprofile;
import com.shop.fashionmale.model.User;
import com.shop.fashionmale.repository.ICustomerRepository;
import com.shop.fashionmale.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerServiceImpl implements ICustomerService {
    @Autowired
    ICustomerRepository customerRepository;

    @Override
    public void deleteById(String id) {
        customerRepository.deleteById(id);
    }

    @Override
    public Optional<Customerprofile> findById(String id) {
        return customerRepository.findById(id);
    }

    @Override
    public Boolean existsByUser(Optional<User> user) {
        return customerRepository.existsByUser(user);
    }

    @Override
    public Page<Customerprofile> findAll(Pageable pageable) {
        return customerRepository.findAll(pageable);
    }

    @Override
    public Customerprofile save(Customerprofile customerprofile) {
        return customerRepository.save(customerprofile);
    }

    @Override
    public Boolean existsById(String id) {
        return customerRepository.existsById(id);
    }

}
