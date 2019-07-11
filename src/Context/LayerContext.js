import React, { createContext } from "react";

export const LayerContext = createContext();
export const LayerContextProvider = props => {
  return (
    <LayerContext.Provider value={{ layer: [] }}>
      {props.children}
    </LayerContext.Provider>
  );
};
export const LayerContextConsumer = LayerContext.Consumer;
