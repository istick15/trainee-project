import React, { useState, useContext, useEffect } from "react";
import {
  Switch,
  MenuItem,
  Card,
  CardActions,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getMapLayers, GetDisplay } from "../MyMap/Request";
import { MapContext } from "../MyMap/MapContext";
import DeleteIcon from "@material-ui/icons/DeleteSweep";
//import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Workspace from "./WorkSpace";
import { LayerContext } from "../../Context/LayerContext";
import { Paper } from "material-ui";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 50
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: "2%",
    left: "6%",
    margin: "0 auto"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: 300
  },
  icon: {
    "&:hover": {
      color: "#F2AD2E"
    }
  }
}));

const AddLayer = () => {
  const classes = useStyles();
  const layerContext = useContext(LayerContext);

  const [layers, setLayers] = useState({ wms: [] });

  const [open, setOpen] = useState(false);
  const [change, setChange] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setChange(e.target.value);
    setError(false);
    setTextError("");

    if (e.target.value === "") {
      setError(true);
      setTextError("please select your layer");
    } else {
      const input = layerContext.layer.filter(
        (re) => re.layer_name === e.target.value
      )[0];
      console.log(input);
      setLayers({ ...layers, wms: [...layers.wms, input] });
      const remian = layerContext.layer.filter(
        (c) => c.layer_name !== e.target.value
      );
      layerContext.layer = remian;
    }
  };

  const [error, setError] = useState(false);
  const [textError, setTextError] = useState("");

  return (
    <div>
      <Workspace />
    </div>
  );
};

export default AddLayer;
