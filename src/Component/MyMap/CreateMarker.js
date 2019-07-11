import React, { useContext, useState, forwardRef, useEffect } from "react";
import {
  Button,
  Card,
  Typography,
  Tooltip,
  IconButton
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
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { FeatureContext } from "./FeatureContext";
import { async } from "q";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles((theme) => ({
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
    bottom: "1%"
  },
  position: {
    position: "absolute",
    zIndex: 1,
    top: "13%",
    width: 780,
    margin: "0 auto",
    left: 10
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
      GetSite().then((s) => {
        GetDataset(s.data.site_id).then((ds) => {
          getFeature(s.data.site_id, ds.data.dataset_id).then((gf) => {
            featureContext.feature = gf.data;
          });
        });
      });
    } else {
    }
  }, []);

  const addPoint = (e) => {
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
  };
  const offpoint = () => {
    if (window.confirm("Are you sure you want to save?")) {
      document.body.style.cursor = "default";
      //setBtnShow(true);
      mapContext.map.off("click", addPoint);
    }
    GetSite().then((s) => {
      console.log(s.data.site_id);
      GetDataset(s.data.site_id).then((ds) => {
        console.log(ds.data.dataset_id);
        CreateFeature(
          geojson.features,
          s.data.site_id,
          ds.data.dataset_id
        ).then((f) => {
          console.log(f);
          CreateTile(s.data.site_id, ds.data.dataset_id).then((ct) => {
            console.log(ct);
          });
        });
      });
    });
  };

  const [attribute, setAttribute] = useState({
    columns: [
      { title: "ID", field: "id" },
      { title: "Name", field: "name" },
      { title: "Coordinate", field: "coordinates" }
    ]
  });

  const CreatePoint = () => {
    const map = mapContext.map;
    document.body.style.cursor = "crosshair";
    map.on("click", addPoint);

    GetSite().then((s) => {
      GetDataset(s.data.site_id).then((ds) => {
        getFeature(s.data.site_id, ds.data.dataset_id).then((gf) => {
          console.log(gf.data);
        });
      });
    });
  };
  const featuresshow = featureContext.feature.map((key) => {
    const { id, name, description } = key;
    return {
      id: key.properties.id,
      name: key.properties.name,
      description: key.properties.description,
      coordinates:
        "[" +
        key.geometry.coordinates[0] +
        "," +
        key.geometry.coordinates[1] +
        "]"
    };
  });
  console.log(featuresshow);
  return (
    <div>
      <Tooltip title="Marker" placement="right">
        <Card className={classes.fabButton}>
          <IconButton onClick={CreatePoint} size="small">
            <AddLocation fontSize="large" />
          </IconButton>
        </Card>
      </Tooltip>
      <div className={classes.position}>
        <MaterialTable
          title="Edit"
          icons={tableIcons}
          columns={attribute.columns}
          data={featuresshow}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [featuresshow];
                  data.push(newData);
                  setAttribute({ ...attribute, data });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [featuresshow];
                  data[data.indexOf(oldData)] = newData;
                  setAttribute({ ...attribute, data });
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [featuresshow];
                  data.splice(data.indexOf(oldData), 1);
                  setAttribute({ ...attribute, data });
                }, 600);
              })
          }}
        />
      </div>
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
