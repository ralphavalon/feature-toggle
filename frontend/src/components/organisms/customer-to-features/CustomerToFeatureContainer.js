import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import serialize from 'form-serialize';

import CustomerToFeature from './CustomerToFeature';
import { StoreContext } from '../../../utils/store';

const CustomerToFeatureContainer = props => {
  const { features: [features, setFeatures] } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {}, [features]);

  const addCustomerToFeatures = async form => {
    const selectedFeatures = form.features;
    form.features = form.features.map(f => ({ name: f }));
    try{
      await axios.post(`${process.env.REACT_APP_FEATURE_TOGGLE_URL}`, {
        featureRequest: form
      });
      let updatedFeatures = [...features];
      for(let i = 0; i < features.length ; i++) {
        if(selectedFeatures.indexOf(features[i].id) >= 0) {
          updatedFeatures[i] = {
            ...features[i],
            customerIds: [...features[i].customerIds, form.customerId]
          };
        }
      }
      setFeatures([...updatedFeatures]);
    } catch (error) {
      setHasError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async event => {
    event.preventDefault();

    const form = serialize(event.target, { hash: true });
    if(!Array.isArray(form.features)) {
      form.features = [form.features];
    }
    await addCustomerToFeatures(form);
    if(props.onSubmit) {
      props.onSubmit();
    }
  };

  return (
    <CustomerToFeature features={features} {...props} onSubmit={onSubmit}/>
  );
};

export default CustomerToFeatureContainer;
