package com.featuretoggle.fixture;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

import com.featuretoggle.model.Customer;
import com.featuretoggle.model.Feature;

public class FeatureFixture {

    public static Feature featureWithId(String technicalName, List<String> customerIds) {
        return Feature.builder()
            .id(technicalName)
            .displayName("displayName")
            .technicalName(technicalName)
            .expiresOn(LocalDateTime.of(2021, Month.JANUARY, 30, 15, 31))
            .description("description")
            .inverted(false)
            .customers(toCustomers(customerIds))
            .active(true)
            .build();
    }

    private static List<Customer> toCustomers(List<String> customerIds) {
        List<Customer> customers = new ArrayList<>();
        customerIds.forEach(customerId -> {
            customers.add(Customer.builder().id(customerId).build());
        });
        
        return customers;
    }
    
}
