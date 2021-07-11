package com.featuretoggle.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import com.featuretoggle.controller.request.CreateFeatureToggleRequest;
import com.featuretoggle.controller.response.CreateFeatureToggleResponse;
import com.featuretoggle.model.Feature;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/features")
@CrossOrigin
public class FeatureController {

    private Map<String, Feature> featureToggleMap = new HashMap<>();

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public CreateFeatureToggleResponse createFeature(@Valid @RequestBody CreateFeatureToggleRequest request) {
        featureToggleMap.put(request.getTechnicalName(), request.toModel());
        return new CreateFeatureToggleResponse(request.getTechnicalName());
    }

}
