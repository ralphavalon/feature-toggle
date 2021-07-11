import React, { useContext } from 'react';
import { StoreContext } from './store';

const getCustomerIds = () => {
  const { features: [features, setFeatures] } = useContext(StoreContext);

  let customerIds = [];
  features.forEach(f => {
    customerIds = customerIds.concat(f.customerIds.filter((item) => customerIds.indexOf(item) < 0));
  });
  return customerIds;
};

export { getCustomerIds };
