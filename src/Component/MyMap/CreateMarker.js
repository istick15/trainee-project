import React, { useContext, useEffect, useState } from "react";
import {
  IconButton,
  Button,
  Divider,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddLocation from "@material-ui/icons/AddLocation";
import { MapContext } from "./MapContext";
import LocationOffIcon from "@material-ui/icons/LocationOff";

const useStyles = makeStyles(theme => ({
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: "8%",
    right: "70%",
    margin: "0 auto"
  }
}));
var geojson = {
  type: "FeatureCollection",
  features: []
};

const CreateMarker = () => {
  const classes = useStyles();
  const mapContext = useContext(MapContext);
  const [off, setOff] = useState(true);
  const addPoint = e => {
    const map = mapContext.map;
    var features = map.queryRenderedFeatures(e.point, {
      layers: ["geojson-points"]
    });

    if (features.length) {
      var id = features[0].properties.id;
      geojson.features = geojson.features.filter(function(point) {
        return point.properties.id !== id;
      });
    } else {
      var point = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [e.lngLat.lng, e.lngLat.lat]
        },
        properties: {
          id: String(new Date().getTime()),
          description: []
        }
      };

      geojson.features.push(point);
    }
    map.getSource("geojson").setData(geojson);
    console.log(map.getStyle());
  };

  const offpoint = () => {
    if (window.confirm("Are you sure you want to save?")) {
      mapContext.map.off("click", addPoint);
    }
    setOff(!off);
  };
  const CreatePoint = () => {
    const map = mapContext.map;

    map.on("click", addPoint);
  };

  return (
    <div>
      {/* <IconButton
        color="primary"
        className={classes.fabButton}
        onClick={CreatePoint}
      >
        <AddLocation />
      </IconButton> */}
      <Card className={classes.fabButton}>
        <CardActionArea onClick={CreatePoint}>
          <div align="center">
            {off ? (
              <AddLocation className={classes.icon} fontSize="large" />
            ) : (
              <LocationOffIcon className={classes.icon} fontSize="large" />
            )}
          </div>
          <Divider variant="inset" />
          <CardContent>
            <Typography variant="caption">Marker</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={offpoint}>
            <Typography variant="caption">Save</Typography>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CreateMarker;
