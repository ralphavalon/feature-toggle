import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import serialize from 'form-serialize';
import PropTypes from 'prop-types';

import FeatureCard from './FeatureCard';
import { StoreContext } from '../../../utils/store';

const FeatureCardContainer = props => {
  const { features: [features, setFeatures] } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isNew = () => !props.id;

  const createOrUpdateFeature = async feature => {
    try{
      setIsLoading(true);
      const result = await axios.put(`${process.env.REACT_APP_FEATURE_TOGGLE_URL}`, feature);
      // feature.id = result.data.id;
      if(isNew()) {
        setFeatures([...features, { ...feature, id: result.data.id}]);
      }
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

    if(!Array.isArray(feature.customerIds) && feature.customerIds) {
      feature.customerIds = [feature.customerIds];
    }
    if(feature.expiresOn) {
      feature.expiresOn = feature.expiresOn.replace(/ /g,'');
    }

    await createOrUpdateFeature(feature);

    if(props.onSubmit) {
      props.onSubmit();
    }
  };

  return (
    <FeatureCard {...props} isNew={isNew()} onSubmit={onSubmit}/>
  );
};

FeatureCardContainer.propTypes = {
  onSubmit: PropTypes.func,
  id: PropTypes.string,
};

export default FeatureCardContainer;
