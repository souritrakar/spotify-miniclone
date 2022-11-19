import React, { createContext, useReducer, useContext } from "react";

export const ProviderContext = createContext();

export const Provider = ({ initialState, reducer, children }) => {
  return (
    <ProviderContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </ProviderContext.Provider>
  );
};

export const useProviderValue = () => useContext(ProviderContext);

