package com.featuretoggle.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import com.featuretoggle.fixture.FeatureFixture;
import com.featuretoggle.helper.JsonHelper;
import com.featuretoggle.model.Feature;
import com.featuretoggle.service.FeatureService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

@ExtendWith(SpringExtension.class)
@WebMvcTest(FeatureController.class)
public class FeatureControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private FeatureService featureService;

    private String mainPath = "/api/v1/features";

    @Test
    public void shouldAddFeature() throws Exception {
        String request = JsonHelper.loadRequest("create_feature");

        when(featureService.save(any(Feature.class))).thenReturn("my-feature-a");

        mvc.perform(post(mainPath)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .content(request))
            .andExpect(status().isCreated())
            .andExpect(content().json(JsonHelper.loadResponse("create_feature")));

        verify(featureService).save(any(Feature.class));
    }

    @Test
    public void shouldSearchWithoutParams() throws Exception {
        
        List<Feature> features = Arrays.asList(
            FeatureFixture.featureWithId("feature-a", Arrays.asList("123", "321")),
            FeatureFixture.featureWithId("feature-b", Arrays.asList("123", "321"))
        );

        when(featureService.findAll()).thenReturn(features);

        mvc.perform(get(mainPath))
            .andExpect(status().isOk())
            .andExpect(content().json(JsonHelper.loadResponse("search")));

        verify(featureService).findAll();
        verify(featureService, times(0)).findAllByCustomerIds(any(List.class));
    }

    @Test
    public void shouldSearchWithParams() throws Exception {
        
        List<Feature> features = Arrays.asList(
            FeatureFixture.featureWithId("feature-a", Arrays.asList("123", "321")),
            FeatureFixture.featureWithId("feature-b", Arrays.asList("123", "321"))
        );

        when(featureService.findAllByCustomerIds(any(List.class))).thenReturn(features);

        mvc.perform(get(mainPath).param("customerIds", "123,321"))
            .andExpect(status().isOk())
            .andExpect(content().json(JsonHelper.loadResponse("search")));

        verify(featureService, times(0)).findAll();
        verify(featureService).findAllByCustomerIds(eq(Arrays.asList("123", "321")));
    }

}
