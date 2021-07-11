package com.featuretoggle.controller.request;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.featuretoggle.model.Customer;
import com.featuretoggle.model.Feature;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CreateFeatureToggleRequest {

    @NotBlank
    private String technicalName;

    @NotNull
    @NotEmpty
    private List<String> customerIds;

    private boolean inverted;
    private String displayName;

    @DateTimeFormat(iso = ISO.DATE_TIME)
    private LocalDateTime expiresOn;

    private String description;
    private boolean active;

    public Feature toModel() {
        return Feature.builder()
            .displayName(displayName)
            .technicalName(technicalName)
            .expiresOn(expiresOn)
            .description(description)
            .inverted(inverted)
            .customers(toCustomers())
            .active(active)
            .build();
    }

    private Set<Customer> toCustomers() {
        Set<Customer> customers = new HashSet<>();
        customerIds.forEach(customerId -> {
            customers.add(Customer.builder().id(customerId).build());
        });
        
        return customers;
    }
    
}
