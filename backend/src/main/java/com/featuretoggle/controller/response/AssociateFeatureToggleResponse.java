package com.featuretoggle.controller.response;

import java.util.ArrayList;
import java.util.List;

import com.featuretoggle.model.Feature;

import lombok.Getter;

@Getter
public class AssociateFeatureToggleResponse {

    private List<FeatureResponse> features;

    public AssociateFeatureToggleResponse(List<Feature> features) {
        this.features = new ArrayList<>();
        features.forEach(f -> this.features.add(new FeatureResponse(f)));
    }

    @Getter
    static class FeatureResponse {
        private String name;
        private boolean active;
        private boolean inverted;
        private boolean expired;

        public FeatureResponse(Feature feature) {
            this.name = feature.getTechnicalName();
            this.active = feature.isActive();
            this.inverted = feature.isInverted();
            this.expired = feature.isExpired();
        }
    }

}
