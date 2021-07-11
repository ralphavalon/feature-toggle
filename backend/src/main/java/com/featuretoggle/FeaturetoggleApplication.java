package com.featuretoggle;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FeaturetoggleApplication {

	public static void main(String[] args) {
		SpringApplication.run(FeaturetoggleApplication.class, args);
	}

	@PostConstruct
	public void startup() {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

}
