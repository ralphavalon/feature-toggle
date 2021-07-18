import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import serialize from 'form-serialize';
import PropTypes from 'prop-types';

import FeatureCard from './FeatureCard';
import { StoreContext } from '../../../utils/store';

const FeatureCardContainer = props => {
  const { features: [features, setFeatures] } = useContext(StoreContext);
  const [invalid, setInvalid] = useState({});
  useEffect(() => {}, [invalid]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isNew = () => !props.id;

  const isValid = feature => {
    const invalids = {};

    if(!feature.technicalName) invalids['technicalName'] = 'Must not be empty';
    if(!feature.customerIds || feature.customerIds.length === 0) invalids['customerIds'] = 'Must not be empty';
    if(Object.keys(invalids).length > 0) {
      setInvalid(invalids);
    } else {
      setInvalid({});
    }
    return Object.keys(invalids).length === 0;
  };

  const createOrUpdateFeature = async feature => {
    try{
      setIsLoading(true);
      const result = await axios.put(`${process.env.REACT_APP_FEATURE_TOGGLE_URL}`, feature);
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
    if(isValid(feature)) {
      await createOrUpdateFeature(feature);

      if(props.onSubmit) {
        props.onSubmit();
      }
    }
  };

  const onRemove = async id => {
    try {
      await axios.delete(`${process.env.REACT_APP_FEATURE_TOGGLE_URL}/${id}`);
      setFeatures(features.filter(feature => feature.id !== id));
    } catch (error) {
      setHasError(true);
      console.error(error);
    }
  };

  return (
    <FeatureCard {...props}
      isNew={isNew()}
      invalid={invalid}
      onRemove={onRemove}
      onSubmit={onSubmit}/>
  );
};

FeatureCardContainer.propTypes = {
  onSubmit: PropTypes.func,
  id: PropTypes.string,
};

export default FeatureCardContainer;
