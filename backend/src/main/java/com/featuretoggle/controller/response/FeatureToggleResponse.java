package com.featuretoggle.controller.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.featuretoggle.model.Customer;
import com.featuretoggle.model.Feature;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeatureToggleResponse {

    private String id;
    private String displayName;
    private String technicalName;
    private LocalDateTime expiresOn;
    private String description;
    private boolean inverted;
    private List<String> customerIds;
    private boolean active;

    public FeatureToggleResponse(Feature feature) {
        this.id = feature.getId();
        this.displayName = feature.getDisplayName();
        this.technicalName = feature.getTechnicalName();
        this.expiresOn = feature.getExpiresOn();
        this.description = feature.getDescription();
        this.inverted = feature.isInverted();
        this.customerIds = feature.getCustomers().stream().map(Customer::getId).collect(Collectors.toList());
        this.active = feature.isActive();
    }
    
}
