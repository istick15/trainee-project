import React from "react";
import { MapContextProvider } from "./MapContext";
import MapContainer from "./MapContainer";
import MapHead from "./MapHead";
import MapTools from "./MapTools";

const Mymap = (props) => {
  return (
    <MapContextProvider>
      <MapHead />
      <MapContainer />
      <MapTools />
    </MapContextProvider>
  );
};

export default Mymap;
