package com.featuretoggle.service;

import java.util.Optional;

import com.featuretoggle.model.Customer;
import com.featuretoggle.persistence.CustomerRepository;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CustomerService {

    private CustomerRepository customerRepository;

    public Customer save(Customer customer) {
        customerRepository.save(customer);
        return customer;
    }

    public Customer save(String customerId) {
        return this.save(Customer.builder().id(customerId).build());
    }

    public Optional<Customer> findById(String customerId) {
        return customerRepository.findById(customerId);
    }

}
