package com.featuretoggle.controller;

import javax.validation.Valid;

import com.featuretoggle.controller.request.SearchFeatureToggleRequest;
import com.featuretoggle.controller.request.CreateFeatureToggleRequest;
import com.featuretoggle.controller.request.SearchFeatureRequest;
import com.featuretoggle.controller.response.SearchFeatureToggleResponse;
import com.featuretoggle.controller.response.CreateFeatureToggleResponse;
import com.featuretoggle.controller.response.FeatureToggleResponse;
import com.featuretoggle.controller.response.FeatureToggleResponseList;
import com.featuretoggle.service.FeatureService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/features")
@AllArgsConstructor
@CrossOrigin
public class FeatureController {

    private FeatureService featureService;

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    @ApiOperation(value = "", response = FeatureToggleResponse.class, responseContainer = "List")
    public FeatureToggleResponseList getFeatures(SearchFeatureRequest request) {
        if (request.getCustomerIds() != null && request.getCustomerIds().size() > 0) {
            return new FeatureToggleResponseList(featureService.findAllByCustomerIds(request.getCustomerIds()));
        }
        return new FeatureToggleResponseList(featureService.findAll());
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.OK)
    public SearchFeatureToggleResponse searchPerCustomer(
            @Valid @RequestBody SearchFeatureToggleRequest request) {
        return new SearchFeatureToggleResponse(request.getFeatureRequest().getCustomerId(), featureService.findAllById(
                request.getFeatureRequest().getFeatureIds()));
    }

    @PutMapping
    @ResponseStatus(code = HttpStatus.OK)
    public CreateFeatureToggleResponse createOrUpdateFeature(@Valid @RequestBody CreateFeatureToggleRequest request) {
        return new CreateFeatureToggleResponse(featureService.saveOrUpdate(request.toModel()).getId());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void archiveFeature(@PathVariable("id") String id) {
        featureService.archiveFeature(id);
    }

}
