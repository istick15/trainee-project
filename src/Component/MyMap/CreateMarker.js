import React, { useContext, useState, forwardRef, useEffect } from "react";
import {
  Button,
  Card,
  Typography,
  Tooltip,
  IconButton,
  CardContent,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddLocation from "@material-ui/icons/AddLocation";
import { MapContext } from "./MapContext";
import SaveIcon from "@material-ui/icons/Save";
import {
  GetSite,
  GetDataset,
  CreateFeature,
  CreateTile,
  getFeature
} from "./Request";

import { FeatureContext } from "./FeatureContext";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles(theme => ({
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: "7%",
    left: "6%",
    margin: "0 auto"
  },
  btn: {
    position: "absolute",
    right: "1%",
    bottom: "1%",
    color: "#32CD32"
  },
  btncancel: {
    position: "absolute",
    right: "32%",
    bottom: "1%"
  },
  position: {
    position: "absolute",
    zIndex: 1,
    top: "13%",
    width: 780,
    margin: "0 auto",
    left: 10
  },
  input: {
    position: "absolute",
    top: "15%"
  },
  text: {
    marginBottom: 10
  }
}));
var geojson = {
  type: "FeatureCollection",
  features: []
};

const CreateMarker = () => {
  const classes = useStyles();
  const mapContext = useContext(MapContext);
  const featureContext = useContext(FeatureContext);

  useEffect(() => {
    if ((featureContext.feature = [])) {
      GetSite().then(s => {
        GetDataset(s.data.site_id).then(ds => {
          getFeature(s.data.site_id, ds.data.dataset_id).then(gf => {
            featureContext.feature = gf.data;
          });
        });
      });
    } else {
    }
  }, []);

  const [name, setName] = useState({ name: "" });
  const [description, setDescription] = useState("");

  const NameChange = e => {
    setName({ ...name.name, [e.target.name]: e.target.value });
  };
  console.log(name);
  const addPoint = e => {
    const map = mapContext.map;
    const style = map.getStyle();
    const filter = style.layers.filter(rs => rs.id === "geojson-points");

    if (filter.length === 1) {
      console.log(filter);
    } else {
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
    }

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
  };

  const offpoint = () => {
    if (window.confirm("Are you sure you want to save?")) {
      document.body.style.cursor = "default";

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
          if (f.data.status === 1) {
            getFeature(s.data.site_id, ds.data.dataset_id).then(gf => {
              featureContext.feature = gf.data;
            });
            CreateTile(s.data.site_id, ds.data.dataset_id).then(ct => {
              console.log(ct);
            });
          }
        });
      });
    });
  };

  const CancelPoint = () => {
    document.body.style.cursor = "default";
    const map = mapContext.map;
    map.removeLayer("geojson-points");

    mapContext.map.off("click", addPoint);
  };
  const CreatePoint = () => {
    const map = mapContext.map;
    document.body.style.cursor = "crosshair";
    map.on("click", addPoint);

    GetSite().then(s => {
      GetDataset(s.data.site_id).then(ds => {
        getFeature(s.data.site_id, ds.data.dataset_id).then(gf => {
          console.log(gf.data);
        });
      });
    });
  };

  return (
    <div>
      <Tooltip title="Marker" placement="right">
        <Card className={classes.fabButton}>
          <IconButton onClick={CreatePoint} size="small">
            <AddLocation fontSize="large" />
          </IconButton>
        </Card>
      </Tooltip>
      <div className={classes.input}>
        <Card>
          <CardContent>
            <TextField
              className={classes.text}
              variant="outlined"
              label="Name"
              name="name"
              value={name.name}
              onChange={NameChange}
            />
            <TextField
              className={classes.text}
              variant="outlined"
              label="Description"
            />
          </CardContent>
        </Card>
      </div>
      <Button onClick={offpoint} className={classes.btn} variant="outlined">
        <SaveIcon />
        <Typography variant="caption">Save</Typography>
      </Button>
      {/* <Button
        color="secondary"
        className={classes.btncancel}
        variant="outlined"
        onClick={CancelPoint}
      >
        <CancelIcon />
        <Typography variant="caption">Cancel</Typography>
      </Button> */}
    </div>
  );
};

export default CreateMarker;
