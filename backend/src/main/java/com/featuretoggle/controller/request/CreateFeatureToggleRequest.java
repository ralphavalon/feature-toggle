package com.featuretoggle.controller.request;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.featuretoggle.model.Feature;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreateFeatureToggleRequest {

    @NotBlank
    private String technicalName;
    @NotNull
    @NotEmpty
    private List<String> customerIds;
    private boolean inverted;
    
    private String displayName;
    private LocalDateTime expiresOn;
    private String description;
    
    private boolean active;

    public Feature toModel() {
        return Feature.builder()
            .displayName(displayName)
            .technicalName(technicalName)
            .expiresOn(expiresOn)
            .description(description)
            .inverted(inverted)
            .customerIds(customerIds)
            .active(active)
            .build();
    }
    
}
