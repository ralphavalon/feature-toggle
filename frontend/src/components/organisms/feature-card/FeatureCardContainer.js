import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import serialize from 'form-serialize';

import FeatureCard from './FeatureCard';
import { StoreContext } from '../../../utils/store';

const FeatureCardContainer = props => {
  const { features: [features, setFeatures] } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isNew = () => !props.id;

  useEffect(async () => {
    try{
      // const result = await axios.get(`${process.env.REACT_APP_FEATURE_TOGGLE_URL}`);
      // const result = await axios.get('http://localhost:8080/api/v1/features');
      // setFeatures(result.data);
    } catch (error) {
      setHasError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }

  }, []);

  const createFeature = async feature => {
    try{
      const result = await axios.post(`${process.env.REACT_APP_FEATURE_TOGGLE_URL}`, feature);
      feature.id = result.data.id;
      setFeatures([...features, feature]);
    } catch (error) {
      setHasError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async event => {
    event.preventDefault();

    const feature = serialize(event.target, { hash: true });
    if(!Array.isArray(feature.customerIds)) {
      feature.customerIds = [feature.customerIds];
    }
    console.log(feature);
    if(isNew()) {
      await createFeature(feature);
    }
    if(props.onSubmit) {
      props.onSubmit();
    }
  };

  return (
    <FeatureCard {...props} isNew={isNew()} onSubmit={onSubmit}/>
  );
};

export default FeatureCardContainer;
