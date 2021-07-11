import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import FeatureList from './FeatureList';
import { StoreContext } from '../../../utils/store';

const FeatureListContainer = () => {
  const { features: [features, setFeatures] } = useContext(StoreContext);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(async () => {
    try{
      const result = await axios.get(`${process.env.REACT_APP_FEATURE_TOGGLE_URL}`);
      setFeatures(result.data);
    } catch (error) {
      setHasError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }

  }, []);

  return (
    <FeatureList features={features} />
  );
};

export default FeatureListContainer;
