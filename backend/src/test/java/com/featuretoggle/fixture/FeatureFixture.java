package com.featuretoggle.fixture;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.featuretoggle.model.Customer;
import com.featuretoggle.model.Feature;

public class FeatureFixture {

    public static Feature featureWithId(String technicalName, List<String> customerIds) {
        return builderWithId(technicalName, customerIds).build();
    }

    public static Feature.FeatureBuilder builderWithId(String technicalName, List<String> customerIds) {
        return Feature.builder()
            .id(technicalName)
            .displayName("displayName")
            .technicalName(technicalName)
            .expiresOn(LocalDateTime.of(2021, Month.JANUARY, 30, 15, 31))
            .description("description")
            .inverted(false)
            .customers(toCustomers(customerIds))
            .active(true);
    }

    private static Set<Customer> toCustomers(List<String> customerIds) {
        Set<Customer> customers = new HashSet<>();
        customerIds.forEach(customerId -> {
            customers.add(Customer.builder().id(customerId).build());
        });
        
        return customers;
    }
    
}
