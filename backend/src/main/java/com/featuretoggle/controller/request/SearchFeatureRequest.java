package com.featuretoggle.controller.request;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SearchFeatureRequest {

    private List<String> customerIds;
    
}
