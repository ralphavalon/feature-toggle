package com.featuretoggle.service;

import java.util.List;
import java.util.Optional;

import com.featuretoggle.model.Customer;
import com.featuretoggle.model.Feature;
import com.featuretoggle.persistence.FeatureRepository;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FeatureService {

    private FeatureRepository featureRepository;
    private CustomerService customerService;

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

    public List<Feature> associateCustomerToFeatures(String customerId, List<String> featureIds) {
        Optional<Customer> customerOptional = customerService.findById(customerId);
        Customer customer = customerOptional.orElseGet(() -> customerService.save(customerId));
        
        List<Feature> features = featureRepository.findAllById(featureIds);
        
        features.forEach(feature -> feature.getCustomers().add(customer));

        featureRepository.saveAll(features);
        return features;
    }

}
