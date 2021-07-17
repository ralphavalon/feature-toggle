package com.featuretoggle.service;

import java.util.List;

import com.featuretoggle.model.Feature;
import com.featuretoggle.persistence.FeatureRepository;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FeatureService {

    private FeatureRepository featureRepository;

    public Feature saveOrUpdate(Feature feature) {
        feature.setId(feature.getTechnicalName());
        featureRepository.save(feature);
        return feature;
    }

    public List<Feature> findAll() {
        return featureRepository.findAll();
    }

    public List<Feature> findAllByCustomerIds(List<String> customerIdList) {
        return featureRepository.findAllDistinctByCustomersIdIn(customerIdList);
    }

    public List<Feature> findAllById(List<String> featureIds) {
        return featureRepository.findAllById(featureIds);
    }

    public void archiveFeature(String id) {
        featureRepository.deleteById(id);
    }
}
