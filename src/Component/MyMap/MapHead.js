import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  List,
  Drawer,
  Divider,
  Typography,
  Tooltip
} from "@material-ui/core";
import LayersIcon from "@material-ui/icons/Layers";
import SelectLayers from "./SelectLayers";
import ArrowBackiosIcon from "@material-ui/icons/ArrowBackIos";
import PublicIcon from "@material-ui/icons/Public";
import AccountIcon from "@material-ui/icons/AccountCircle";
import MapStyleChange from "./MapStyleChange";
import CreateMarker from "./CreateMarker";
import useReactRouter from "use-react-router";
import EditIcon from "@material-ui/icons/Edit";

const DrawerWidth = 60;
const useStyles = makeStyles(theme => ({
  backG: {
    backgroundColor: "#4a4a4a"
  },
  list: {
    width: 60,
    overflowX: "hidden"
  },
  paper: {
    width: 300,
    height: 450,
    overflow: "auto"
  },
  layerlist: {
    left: DrawerWidth,
    width: 320,
    border: "1px solid ",
    borderColor: "#E0E0E0",
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  },
  btn: {
    left: 5,
    marginBottom: 5
  },
  line: {
    border: "1px solid grey"
  },
  edit: {
    left: DrawerWidth,
    width: 320,
    border: "1px solid ",
    borderColor: "#E0E0E0",
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  }
}));
const MapHead = () => {
  const classes = useStyles();

  const [openlayer, setOpenLayer] = useState(false);
  const [baseOpen, setBaseOpen] = useState(false);
  const [location, setLocation] = useState(false);
  const [btncolor, setBtnColor] = useState("#4a4a4a");
  const [BMcolor, setBMcolor] = useState("#4a4a4a");
  const [locationColor, setLocationColor] = useState("#4a4a4a");

  const handleOpen = () => {
    setOpenLayer(!openlayer);
    setBaseOpen(false);
    setLocation(false);
    if (!openlayer) {
      setBtnColor("white");
      setBMcolor("#4a4a4a");
      setLocationColor("#4a4a4a");
    } else {
      setBtnColor("#4a4a4a");
    }
  };
  const handleClose = () => {
    setOpenLayer(false);
    if (!openlayer) {
      setBtnColor("white");
      setBMcolor("#4a4a4a");
      setLocationColor("#4a4a4a");
    } else {
      setBtnColor("#4a4a4a");
    }
  };

  const BaseMapOpen = () => {
    setBaseOpen(!baseOpen);
    setOpenLayer(false);
    setLocation(false);
    if (!baseOpen) {
      setBMcolor("white");
      setBtnColor("#4a4a4a");
      setLocationColor("#4a4a4a");
    } else {
      setBMcolor("#4a4a4a");
    }
  };
  const BaseMapClose = () => {
    setBaseOpen(false);
    if (!baseOpen) {
      setBMcolor("white");
      setBtnColor("#4a4a4a");
      setLocationColor("#4a4a4a");
    } else {
      setBMcolor("#4a4a4a");
    }
  };

  const LocationOpen = () => {
    setLocation(!location);
    setOpenLayer(false);
    setBaseOpen(false);
    if (!location) {
      setLocationColor("white");
      setBMcolor("#4a4a4a");
      setBtnColor("#4a4a4a");
    } else {
      setLocationColor("#4a4a4a");
    }
  };

  const LocationClose = () => {
    setLocation(false);
    if (!location) {
      setLocationColor("white");
      setBMcolor("#4a4a4a");
      setBtnColor("#4a4a4a");
    } else {
      setLocationColor("#4a4a4a");
    }
  };

  const { history } = useReactRouter();

  const goBack = () => {
    history.replace("/Backend");
  };

  return (
    <div>
      <Drawer
        classes={{ paperAnchorLeft: classes.backG }}
        className={classes.list}
        variant="permanent"
        anchor="left"
      >
        <Tooltip title="Back" placement="right">
          <IconButton onClick={goBack}>
            <AccountIcon color="primary" />
          </IconButton>
        </Tooltip>
        <div className={classes.list} role="presentation">
          <Divider className={classes.line} />
          <List>
            <Tooltip title="Layers" placement="right">
              <IconButton
                className={classes.btn}
                onClick={handleOpen}
                style={{ backgroundColor: btncolor }}
              >
                <LayersIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Basemap" placement="right">
              <IconButton
                className={classes.btn}
                onClick={BaseMapOpen}
                style={{ backgroundColor: BMcolor }}
              >
                <PublicIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Map" placement="right">
              <IconButton
                className={classes.btn}
                onClick={LocationOpen}
                style={{ backgroundColor: locationColor }}
              >
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
          </List>
        </div>
      </Drawer>
      <Drawer
        variant="persistent"
        anchor="left"
        open={openlayer}
        classes={{ paper: classes.layerlist }}
      >
        <div>
          <IconButton onClick={handleClose}>
            <ArrowBackiosIcon />
          </IconButton>
          <Typography variant="overline">Select your layers</Typography>
          <Divider />
          <SelectLayers />
          <Divider />
        </div>
      </Drawer>
      <Drawer
        variant="persistent"
        anchor="left"
        open={baseOpen}
        classes={{ paper: classes.layerlist }}
      >
        <div>
          <IconButton onClick={BaseMapClose}>
            <ArrowBackiosIcon />
          </IconButton>
          <Typography variant="overline">Select Basemap</Typography>
          <Divider />
          <MapStyleChange />
        </div>
      </Drawer>
      <Drawer
        variant="persistent"
        anchor="left"
        open={location}
        classes={{ paper: classes.edit }}
      >
        <div>
          <IconButton onClick={LocationClose}>
            <ArrowBackiosIcon />
          </IconButton>
          <Typography variant="overline">Edit Map</Typography>
          <CreateMarker />
          <Divider />
        </div>
      </Drawer>
    </div>
  );
};

export default MapHead;
