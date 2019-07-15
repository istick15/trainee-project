import React, { createContext } from "react";

const MapContext = createContext();
const MapContextProvider = (props) => {
  return (
    <MapContext.Provider value={{ map: null }}>
      {props.children}
    </MapContext.Provider>
  );
};

const MapContextConsumer = MapContext.Consumer;

export { MapContext, MapContextProvider, MapContextConsumer };
