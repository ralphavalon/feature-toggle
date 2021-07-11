package com.featuretoggle.persistence;

import java.util.List;

import com.featuretoggle.model.Feature;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FeatureRepository extends JpaRepository<Feature, String> {

    List<Feature> findAllDistinctByCustomersIdIn(List<String> customerIds);
    
}
