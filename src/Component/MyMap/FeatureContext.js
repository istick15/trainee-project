import React, { createContext } from "react";

export const FeatureContext = createContext();
export const FeatureContextProvider = props => {
  return (
    <FeatureContext.Provider value={{ feature: [] }}>
      {props.children}
    </FeatureContext.Provider>
  );
};
export const FeatureContextConsumer = FeatureContext.Consumer;
