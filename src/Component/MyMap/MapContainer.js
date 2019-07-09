import React, { useState, useEffect, useContext } from "react";
import { MapContext } from "./MapContext";
import Basemap from "./Mapstyle";
import { makeStyles } from "@material-ui/core/styles";
import { Map } from "mapbox-gl";
import mapboxgl from "mapbox-gl";

const useStyles = makeStyles(() => ({
  map: { height: `100vh`, width: "100vw" }
}));

mapboxgl.accessToken =
  "pk.eyJ1IjoianVzbWFueiIsImEiOiJjangyczU3azgwNHBzNDlxb2w5OWgzeDZvIn0.xqxSzNNuDT1lHvqZpfMh4g";

var geojson = {
  type: "FeatureCollection",
  features: []
};

const MapContainer = () => {
  const classes = useStyles();
  const mapContext = useContext(MapContext);
  const [mount, setMount] = useState(false);
  useEffect(() => {
    if (mount) {
      mapContext.map = new Map({
        container: "map",
        style: Basemap,
        center: [100.470258, 14.839579]
      });

      mapContext.map.flyTo({
        center: [100.470258, 14.839579],
        zoom: 6,
        speed: 0.53
      });

      mapContext.map.on("load", function() {
        mapContext.map.addSource("geojson", {
          type: "geojson",
          data: geojson
        });
        mapContext.map.addLayer({
          id: "geojson-points",
          type: "circle",
          source: "geojson",
          paint: {
            "circle-radius": 5,
            "circle-color": "#F2AD2E"
          },
          filter: ["in", "$type", "Point"]
        });
      });
    } else {
      setMount(true);
    }
  }, [mount, mapContext]);

  return (
    <div>
      <div id="map" className={classes.map} />
    </div>
  );
};

export default MapContainer;
