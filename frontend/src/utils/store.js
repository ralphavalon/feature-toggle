import React, { useState } from 'react';

export const StoreContext = React.createContext(null);

export default ({ children }) => {
  const [features, setFeatures] = useState([]);
  const [hasError, setHasError] = useState(false);

  const store = {
    features: [features, setFeatures],
    error: [hasError, setHasError]
  };
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

