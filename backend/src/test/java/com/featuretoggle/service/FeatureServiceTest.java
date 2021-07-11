package com.featuretoggle.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import com.featuretoggle.fixture.FeatureFixture;
import com.featuretoggle.model.Feature;
import com.featuretoggle.persistence.FeatureRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class FeatureServiceTest {

    private FeatureRepository featureRepository;
    private FeatureService featureService;

    @BeforeEach
    public void setup() {
        this.featureRepository = mock(FeatureRepository.class);
        this.featureService = new FeatureService(featureRepository);
    }

    @Test
    public void shouldSave() {
        Feature feature = FeatureFixture.featureWithId("technicalName", Arrays.asList("123"));
        assertEquals("technicalName", featureService.save(feature));

        verify(featureRepository).save(feature);
    }

    @Test
    public void shouldFindAll() {
        Feature feature = FeatureFixture.featureWithId("technicalName", Arrays.asList("123"));
        List<Feature> features = Arrays.asList(feature);
        when(featureRepository.findAll()).thenReturn(features);

        assertEquals(features, featureService.findAll());

        verify(featureRepository).findAll();
    }

    @Test
    public void shouldFindAllByCustomerIds() {
        List<String> customerIdList = Arrays.asList("123");
        Feature feature = FeatureFixture.featureWithId("technicalName", customerIdList);
        List<Feature> features = Arrays.asList(feature);
        when(featureRepository.findAllDistinctByCustomersIdIn(customerIdList)).thenReturn(features);

        assertEquals(features, featureService.findAllByCustomerIds(customerIdList));

        verify(featureRepository).findAllDistinctByCustomersIdIn(customerIdList);
    }

    public List<Feature> findAllByCustomerIds(List<String> customerIdList) {
        return featureRepository.findAllDistinctByCustomersIdIn(customerIdList);
    }
    
}
