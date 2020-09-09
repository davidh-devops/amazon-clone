import React, { createContext, useContext, useReducer } from 'react';

export const AppContext = createContext({
  products: [],
  cart: [],
});

const AppProvider = ({ reducer, initialState, children }) => {
  return (
    <AppContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);

export default AppProvider;
