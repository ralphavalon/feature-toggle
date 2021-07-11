package com.featuretoggle.controller.response;

import java.util.ArrayList;
import java.util.List;

import com.featuretoggle.model.Feature;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeatureToggleResponseList extends ArrayList<FeatureToggleResponse> {

    public FeatureToggleResponseList(List<Feature> features) {
        super();
        for (Feature feature : features) {
            add(new FeatureToggleResponse(feature));
        }
    }
    
}
