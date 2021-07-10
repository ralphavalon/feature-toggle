package com.featuretoggle.controller;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.featuretoggle.helper.JsonHelper;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

@ExtendWith(SpringExtension.class)
@WebMvcTest(FeatureController.class)
public class FeatureControllerTest {

    @Autowired
    private MockMvc mvc;

    private String mainPath = "/api/v1/features";

    @Test
    public void shouldAddFeature() throws Exception {
        String request = JsonHelper.loadRequest("create_feature");

        mvc.perform(post(mainPath).contentType(MediaType.APPLICATION_JSON_VALUE).content(request))
            .andExpect(status().isCreated())
            .andExpect(content().json(JsonHelper.loadResponse("create_feature")));
    }
    
}
