import React, { createContext } from "react";

export const MapContext = createContext();
export const MapContextProvider = props => {
  return (
    <MapContext.Provider value={{ map: null }}>
      {props.children}
    </MapContext.Provider>
  );
};
export const MapContextConsumer = MapContext.Consumer;
