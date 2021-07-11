package com.featuretoggle.controller.request;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SearchFeatureToggleRequest {

    private List<String> customerIds;
    
}
