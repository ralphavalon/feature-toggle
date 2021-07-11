import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FeatureCard from './FeatureCard';

const FeatureCardContainer = () => {
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(async () => {
    try{
      // const result = await axios.get(`${process.env.REACT_APP_BEER_URL}`);
      const result = await axios.get(`${process.env.REACT_APP_BEER_URL}`);
      setFeatures(result.data);
    } catch (error) {
      setHasError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }

  }, []);

  return (
    <FeatureCard id="my-feature-a" displayName="My Feature A" description="This and that" />
  );
};

export default FeatureCardContainer;
