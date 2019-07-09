import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  List,
  Drawer,
  Button,
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
    width: 300,
    border: "1px solid ",
    borderColor: "#E0E0E0",
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  },
  btn: {
    marginBottom: 10
  },
  line: {
    border: "2px solid grey"
  }
}));
const MapHead = () => {
  const classes = useStyles();

  const [openlayer, setOpenLayer] = useState(false);
  const [baseOpen, setBaseOpen] = useState(false);
  const [location, setLocation] = useState(false);

  const handleOpen = () => {
    setOpenLayer(!openlayer);
    setBaseOpen(false);
    setLocation(false);
  };
  const handleClose = () => {
    setOpenLayer(false);
  };

  const BaseMapOpen = () => {
    setBaseOpen(!baseOpen);
    setOpenLayer(false);
    setLocation(false);
  };
  const BaseMapClose = () => {
    setBaseOpen(false);
  };

  const LocationOpen = () => {
    setLocation(!location);
    setOpenLayer(false);
    setBaseOpen(false);
  };

  const LocationClose = () => {
    setLocation(false);
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
              <Button className={classes.btn} size="small" onClick={handleOpen}>
                <LayersIcon color="primary" />
              </Button>
            </Tooltip>
            <Tooltip title="Basemap" placement="right">
              <Button
                className={classes.btn}
                size="small"
                onClick={BaseMapOpen}
              >
                <PublicIcon color="primary" />
              </Button>
            </Tooltip>
            <Tooltip title="Edit Map" placement="right">
              <Button
                className={classes.btn}
                size="small"
                onClick={LocationOpen}
              >
                <EditIcon color="primary" />
              </Button>
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
            <Typography variant="overline">Select your layers</Typography>
          </IconButton>
          <Divider />
          <SelectLayers />
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
            <Typography variant="overline">Select Basemap</Typography>
          </IconButton>
          <Divider />
          <MapStyleChange />
        </div>
      </Drawer>
      <Drawer
        variant="persistent"
        anchor="left"
        open={location}
        classes={{ paper: classes.layerlist }}
      >
        <div>
          <IconButton onClick={LocationClose}>
            <ArrowBackiosIcon />
            <Typography variant="overline">Edit Map</Typography>
          </IconButton>
          <CreateMarker />
          <Divider />
        </div>
      </Drawer>
    </div>
  );
};

export default MapHead;
