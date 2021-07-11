import React, { useState } from 'react';

export const StoreContext = React.createContext(null);

export default ({ children }) => {
  const [features, setFeatures] = useState([]);

  const store = {
    features: [features, setFeatures]
  };
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

