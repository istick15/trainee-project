import React, { useState, useEffect, useContext } from "react";
import { MapContext } from "./MapContext";
import Basemap from "./Mapstyle";
import { makeStyles } from "@material-ui/core/styles";
import { Map } from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import { GetSite, GetDataset, getFeature } from "./Request";

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
            "circle-radius": 10,
            "circle-color": "#F2AD2E"
          },
          filter: ["in", "$type", "Point"]
        });

        GetSite().then(s => {
          GetDataset(s.data.site_id).then(ds => {
            getFeature(s.data.site_id, ds.data.dataset_id).then(gf => {
              if (gf.data.length === undefined) {
                mapContext.map.addSource("geo", {
                  type: "geojson",
                  data: {
                    type: "FeatureCollection",
                    features: [gf.data]
                  }
                });
                mapContext.map.addLayer({
                  id: "id",
                  type: "circle",
                  source: "geo",
                  paint: {
                    "circle-radius": 10,
                    "circle-color": "#F2AD2E"
                  }
                });
              } else {
                mapContext.map.addLayer({
                  id: "ids",
                  type: "circle",
                  source: {
                    type: "geojson",
                    data: {
                      type: "FeatureCollection",
                      features: gf.data
                    }
                  },
                  paint: {
                    "circle-radius": 10,
                    "circle-color": "#F2AD2E"
                  }
                });
              }
            });
          });
        });
        const flyto = e => {
          mapContext.map.flyTo({
            center: e.features[0].geometry.coordinates,
            zoom: 13
          });
        };
        mapContext.map.on("click", "ids", flyto);
        mapContext.map.on("mouseenter", "ids", function() {
          mapContext.map.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        mapContext.map.on("mouseleave", "ids", function() {
          mapContext.map.getCanvas().style.cursor = "";
        });
      });

      // GetSite().then(s => {
      //   console.log(s.data.site_id);
      //   GetDataset(s.data.site_id).then(ds => {
      //     console.log(ds.data.dataset_id);
      //     getFeature(s.data.site_id, ds.data.dataset_id).then(gf => {
      //       console.log(gf);
      //     });
      //   });
      // });
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
