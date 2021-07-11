package com.featuretoggle.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.featuretoggle.fixture.FeatureFixture;
import com.featuretoggle.model.Customer;
import com.featuretoggle.model.Feature;
import com.featuretoggle.persistence.FeatureRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class FeatureServiceTest {

    private FeatureRepository featureRepository;
    private FeatureService featureService;
    private CustomerService customerService;

    @BeforeEach
    public void setup() {
        this.featureRepository = mock(FeatureRepository.class);
        this.customerService = mock(CustomerService.class);
        this.featureService = new FeatureService(featureRepository, customerService);
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
    public void shouldAssociateCustomerToFeatures() {
        String customerId = "id";
        Customer expectedCustomer = Customer.builder().id(customerId).build();
        Optional<Customer> customerOptional = Optional.of(expectedCustomer);
        doReturn(customerOptional).when(customerService).findById(anyString());

        List<String> featureIds = Arrays.asList("feature-a", "feature-b");
        List<Feature> features = Arrays.asList(
            FeatureFixture.featureWithId("feature-a", Arrays.asList()),
            FeatureFixture.featureWithId("feature-b", Arrays.asList())
        );
        when(featureRepository.findAllById(featureIds)).thenReturn(features);

        List<Feature> response = featureService.associateCustomerToFeatures(customerId, featureIds);

        assertEquals(2, response.size());
        assertTrue(response.get(0).getCustomers().contains(expectedCustomer));
        assertTrue(response.get(1).getCustomers().contains(expectedCustomer));

        verify(customerService, times(0)).save(customerId);
        verify(customerService).findById(customerId);
        verify(featureRepository).findAllById(featureIds);
        verify(featureRepository).saveAll(features);
        
    }

    @Test
    public void shouldAssociateCustomerToFeaturesEvenWhenCustomerDoesNotExistYet() {
        String customerId = "id";
        Customer expectedCustomer = Customer.builder().id(customerId).build();
        Optional<Customer> customerOptional = Optional.empty();
        when(customerService.findById(customerId)).thenReturn(customerOptional);
        when(customerService.save(customerId)).thenReturn(expectedCustomer);

        List<String> featureIds = Arrays.asList("feature-a", "feature-b");
        List<Feature> features = Arrays.asList(
            FeatureFixture.featureWithId("feature-a", Arrays.asList()),
            FeatureFixture.featureWithId("feature-b", Arrays.asList())
        );
        when(featureRepository.findAllById(featureIds)).thenReturn(features);

        List<Feature> response = featureService.associateCustomerToFeatures(customerId, featureIds);

        assertEquals(2, response.size());
        assertTrue(response.get(0).getCustomers().contains(expectedCustomer));
        assertTrue(response.get(1).getCustomers().contains(expectedCustomer));

        verify(customerService).findById(customerId);
        verify(customerService).save(customerId);
        verify(featureRepository).findAllById(featureIds);
        verify(featureRepository).saveAll(features);
        
    }
    
}
