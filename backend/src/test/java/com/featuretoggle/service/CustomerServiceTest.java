package com.featuretoggle.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import com.featuretoggle.model.Customer;
import com.featuretoggle.persistence.CustomerRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class CustomerServiceTest {

    private CustomerRepository customerRepository;
    private CustomerService customerService;

    @BeforeEach
    public void setup() {
        this.customerRepository = mock(CustomerRepository.class);
        this.customerService = new CustomerService(customerRepository);
    }

    @Test
    public void shouldSave() {
        Customer customer = Customer.builder().id("123").build();
        assertEquals("123", customerService.save(customer).getId());

        verify(customerRepository).save(customer);

        assertEquals("123", customerService.save("123").getId());

        verify(customerRepository, times(2)).save(customer);
    }

    @Test
    public void shouldFindById() {
        String customerId = "123";
        Optional<Customer> expectedOptionalCustomer = Optional.of(Customer.builder().id(customerId).build());
        when(customerRepository.findById(customerId)).thenReturn(expectedOptionalCustomer);

        assertEquals(expectedOptionalCustomer.get(), customerService.findById(customerId).get());

        verify(customerRepository).findById(customerId);
    }

    @Test
    public void shouldNotReturnErrorIfCannotFindById() {
        String customerId = "123";
        Optional<Customer> expectedOptionalCustomer = Optional.empty();
        when(customerRepository.findById(customerId)).thenReturn(expectedOptionalCustomer);

        assertEquals(expectedOptionalCustomer, customerService.findById(customerId));

        verify(customerRepository).findById(customerId);
    }
    
}
