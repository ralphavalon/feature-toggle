package com.featuretoggle.controller.request;

import java.beans.Transient;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AssociateFeatureToggleRequest {

    @NotNull
    @Valid
    private FeatureRequest featureRequest;

    @Getter
    @Setter
    public static class FeatureRequest {

        @NotBlank
        private String customerId;

        @NotNull
        @NotEmpty
        private List<Feature> features;

        @Transient
        public List<String> getFeatureIds() {
            return getFeatures().stream().map(Feature::getName).collect(Collectors.toList());
        }

    }

    @Getter
    @Setter
    public static class Feature {

        @NotBlank
        private String name;

    }

}
