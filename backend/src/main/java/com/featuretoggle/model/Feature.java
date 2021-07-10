package com.featuretoggle.model;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Feature {

    private String displayName;
    private String technicalName;
    private LocalDateTime expiresOn;
    private String description;
    private boolean inverted;
    private List<String> customerIds;
    private boolean active;

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiresOn);
    }

}
