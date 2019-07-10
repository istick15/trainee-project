import React, { useContext, useState } from "react";
import {
  Button,
  Divider,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddLocation from "@material-ui/icons/AddLocation";
import { MapContext } from "./MapContext";
import LocationOffIcon from "@material-ui/icons/LocationOff";
import SaveIcon from "@material-ui/icons/Save";
import { GetSite, GetDataset, CreateFeature, CreateTile } from "./Request";

const useStyles = makeStyles(theme => ({
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: "8%",
    right: "70%",
    margin: "0 auto"
  },
  btn: {
    position: "absolute",
    right: "1%",
    bottom: "1%"
  }
}));
var geojson = {
  type: "FeatureCollection",
  features: []
};

const CreateMarker = () => {
  const classes = useStyles();
  const mapContext = useContext(MapContext);

  //const [btnshow, setBtnShow] = useState(true);

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
          //id: String(new Date().getTime()),
          description: null,
          name: "",
          image: [],
          dfd: null
        }
      };

      geojson.features.push(point);
    }
    map.getSource("geojson").setData(geojson);
    console.log(geojson.features);
    //setBtnShow(false);
    //mapContext.map.off("click", addPoint);
  };
  const offpoint = () => {
    if (window.confirm("Are you sure you want to save?")) {
      document.body.style.cursor = "default";
      //setBtnShow(true);
      mapContext.map.off("click", addPoint);
    }
    GetSite().then(s => {
      console.log(s.data.site_id);
      GetDataset(s.data.site_id).then(ds => {
        console.log(ds.data.dataset_id);
        CreateFeature(
          geojson.features,
          s.data.site_id,
          ds.data.dataset_id
        ).then(f => {
          console.log(f);
          CreateTile(s.data.site_id, ds.data.dataset_id).then(ct => {
            console.log(ct);
          });
        });
      });
    });
  };
  const CreatePoint = () => {
    const map = mapContext.map;
    document.body.style.cursor = "crosshair";
    map.on("click", addPoint);
  };

  return (
    <div>
      <Tooltip title="Marker" placement="right">
        <Card className={classes.fabButton}>
          <CardActionArea onClick={CreatePoint}>
            <div align="center">
              <AddLocation fontSize="large" />
            </div>
            <Divider variant="inset" />
            <CardContent>
              <Typography variant="caption">Marker</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Tooltip>
      <Button
        color="secondary"
        onClick={offpoint}
        className={classes.btn}
        variant="outlined"
        // disabled={btnshow}
      >
        <SaveIcon />
        <Typography variant="caption">Save</Typography>
      </Button>
    </div>
  );
};

export default CreateMarker;
