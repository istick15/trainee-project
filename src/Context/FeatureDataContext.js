import React, { createContext } from "react";

export const FeatureDataContext = createContext();
export const FeatureDataContextProvider = props => {
  return (
    <FeatureDataContext.Provider value={{ data: [] }}>
      {props.children}
    </FeatureDataContext.Provider>
  );
};
export const FeatureDataContextConsumer = FeatureDataContext.Consumer;
