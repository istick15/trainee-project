import React, { useState, useContext, useEffect } from "react";
import { getMapLayers, GetDisplay } from "../MyMap/Request";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { LayerContext } from "../../Context/LayerContext";

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
  }, []);

  const MapServices = layerContext.layer.map((key) => {
    return (
      <MenuItem key={key.layer_id} value={key.layer_name}>
        {key.layer_label}
      </MenuItem>
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
