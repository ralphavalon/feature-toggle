package com.featuretoggle.controller.response;

import java.util.ArrayList;
import java.util.List;

import com.featuretoggle.model.Customer;
import com.featuretoggle.model.Feature;

import lombok.Getter;

@Getter
public class SearchFeatureToggleResponse {

    private List<FeatureResponse> features;

    public SearchFeatureToggleResponse(String customerId, List<Feature> features) {
        Customer customer = Customer.builder().id(customerId).build();
        this.features = new ArrayList<>();
        features.forEach(f -> this.features.add(new FeatureResponse(f, customer)));
    }

    @Getter
    static class FeatureResponse {
        private String name;
        private boolean active;
        private boolean inverted;
        private boolean expired;

        public FeatureResponse(Feature feature, Customer customer) {
            this.name = feature.getTechnicalName();
            this.active = feature.isActive();
            this.inverted = feature.isInverted();
            this.expired = feature.isExpired();
        }
    }

}
