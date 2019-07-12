import React, { useState, useEffect, useContext } from "react";
import { MapContext } from "./MapContext";
import Basemap from "./Mapstyle";
import { makeStyles } from "@material-ui/core/styles";
import { Map } from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import { GetSite, GetDataset, getFeature, getFeatureByID } from "./Request";
import EditFeature from "./EditFeature";
import { FeatureContext } from "./FeatureContext";
import { FeatureDataContext } from "../../Context/FeatureDataContext";

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
  const featureDataContext = useContext(FeatureDataContext);
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
          setShow(show => ({ open: false, hidden: false }));
          mapContext.map.flyTo({
            center: e.features[0].geometry.coordinates,
            zoom: 13
          });
          var fea = mapContext.map.queryRenderedFeatures(e.point);
          console.log(fea);
          console.log(fea[0].properties.id);

          GetSite().then(s => {
            GetDataset(s.data.site_id).then(ds => {
              getFeature(s.data.site_id, ds.data.dataset_id).then(f => {
                getFeatureByID(
                  s.data.site_id,
                  ds.data.dataset_id,
                  fea[0].properties.id
                ).then(gf => {
                  featureDataContext.data = [gf.data];
                  console.log(featureDataContext.data);
                });
              });
            });
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
    } else {
      setMount(true);
    }
  }, [mount, mapContext, featureDataContext]);

  const [show, setShow] = useState({ open: false, hidden: true });
  return (
    <div>
      <div open={show.open} hidden={show.hidden}>
        <EditFeature />
      </div>
      <div id="map" className={classes.map} />
    </div>
  );
};

export default MapContainer;
