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
        assertEquals("technicalName", featureService.saveOrUpdate(feature).getId());

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

    @Test
    public void shouldFindAllById() {
        List<String> featureIds = Arrays.asList("feature-a", "feature-b");
        List<Feature> features = Arrays.asList(
            FeatureFixture.featureWithId("feature-a", Arrays.asList()),
            FeatureFixture.featureWithId("feature-b", Arrays.asList())
        );
        when(featureRepository.findAllById(featureIds)).thenReturn(features);

        List<Feature> response = featureService.findAllById(featureIds);

        assertEquals(2, response.size());

        verify(featureRepository).findAllById(featureIds);
    }

    @Test
    public void shouldDeleteById() {
        String id = "feature-a";

        featureService.archiveFeature(id);

        verify(featureRepository).deleteById(id);
    }
    
}
