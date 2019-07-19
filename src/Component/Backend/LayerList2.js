import React, { useState, useContext, useEffect } from "react";
import {
  getMapLayers,
  GetDisplay,
  AddRequest,
  DeleteLayers
} from "../MyMap/Request";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { LayerContext } from "../../Context/LayerContext";
import { MapContext } from "../../Context/MapContext";
import { Typography, IconButton, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteRequest, { getRequest } from "../../Api/DeleteRequest";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      right: "200px"
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
    root: {
      width: 900,
      height: 400,
      padding: theme.spacing(3, 2),
      marginTop: 100,
      borderRadius: 10
    },
    margin: {
      margin: theme.spacing(1)
    },
    dialogForm: {
      flexDirection: "column",
      width: 600
    },
    Field: {
      width: 900,
      height: 400,
      padding: theme.spacing(3, 2),
      marginTop: 100,
      borderRadius: 10
    },
    layerlist: {
      padding: (-3, 1),
      marginTop: 13
      // borderRadius: 10
    }
  })
);

const LayerList = () => {
  const classes = useStyles();
  const map = MapContext.map;
  // const [wms, setWms] = useState([]);

  const layerContext = useContext(LayerContext);
  console.log(layerContext);
  useEffect(() => {
    if ((layerContext.layer = [])) {
      GetDisplay().then((ml) => {
        layerContext.layer = ml.data;
        console.log(layerContext.layer);
      });
    } else {
    }
  }, [layerContext]);
  console.log(layerContext);
  const DeleteRequest = () => {
    getMapLayers().then((s) => {
      console.log(s);
      DeleteLayers(s.data.layer_id).then((dl) => {
      console.log(dl);
     
      });
      // AddRequest(s.data.layer_id).then((ds) => {
      //   if (window.confirm("Are you sure you want to delete this Layer?")) {
      //     DeleteRequest(s.data.site_id, ds.data.user_id).then((dds) => {
      //       console.log(dds);
      //     });
      //   }
      // });
    });
  };
  const MapServices = layerContext.layer.map((key) => {
    return (
      <div>
        <MenuItem key={key.layer_id} value={key.layer_name}>
          <Typography component="h5" variant="h5">
            {key.layer_label}
          </Typography>
          <Grid container justify="flex-end">
            <IconButton color="secondary" onClick={DeleteRequest}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </MenuItem>
      </div>
    );
  });
  return (
    <div>
      <form direction="vertical" className={classes.layerlist}>
        {MapServices}
      </form>
    </div>
  );
};
export default LayerList;
