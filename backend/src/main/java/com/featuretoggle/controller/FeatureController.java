package com.featuretoggle.controller;

import javax.validation.Valid;

import com.featuretoggle.controller.request.CreateFeatureToggleRequest;
import com.featuretoggle.controller.request.SearchFeatureToggleRequest;
import com.featuretoggle.controller.response.CreateFeatureToggleResponse;
import com.featuretoggle.controller.response.FeatureToggleResponseList;
import com.featuretoggle.service.FeatureService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/features")
@AllArgsConstructor
@CrossOrigin
public class FeatureController {

    private FeatureService featureService;

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public FeatureToggleResponseList getFeatures(SearchFeatureToggleRequest request) {
        if(request.getCustomerIds() != null && request.getCustomerIds().size() > 0) {
            return new FeatureToggleResponseList(
                featureService.findAllByCustomerIds(request.getCustomerIds()));
        }
        return new FeatureToggleResponseList(featureService.findAll());
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public CreateFeatureToggleResponse createFeature(@Valid @RequestBody CreateFeatureToggleRequest request) {
        return new CreateFeatureToggleResponse(featureService.save(request.toModel()));
    }

}
