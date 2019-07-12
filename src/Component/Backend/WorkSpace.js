import React, { useState } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Tooltip,
  FormHelperText
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import { AddMapLayers, AddRequest } from "../MyMap/Request";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: "2%",
    right: "25%",
    margin: "0 auto",
    "&:hover": {
      backgroundColor: "#F2AD2E"
    },
    root: {
      width: 900,
      height: 400,
      padding: theme.spacing(3, 2),
      marginTop: 300,
      borderRadius: 10
    }
  }
}));

const AddMapService = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClse = () => {
    setOpen(false);
  };

  const [layers, setLayers] = useState({});
  const [label, setLabel] = useState({});
  const [link, setLink] = useState({});
  const [description, setDescription] = useState({});
  console.log(layers);
  console.log(link);
  const [errorText, setErrorText] = useState("");
  const addChange = () => {
    if (layers === "" || label === "" || link === "" || description === "") {
      setErrorText("please input value");
    } else {
      AddMapLayers(layers, label, description).then((rs) => {
        if (rs.data.status === 0) {
          setErrorText("Somethiing Invalid, please check ");
        } else {
          console.log(rs);
          console.log(rs.data.layer_id);
          AddRequest(link, rs.data.layer_id).then((rq) => {
            if (rq.data.status === 0) {
              setErrorText("please check url");
            } else {
              console.log(rq);
              setOpen(false);
            }
          });
        }
      });
    }
  };
  return (
    <div>
      <div align="center">
        <Fab
          variant="outlined"
          size="small"
          color="primary"
          aria-label="Add"
          onClick={handleOpen}
          className={classes.icon}
          fontSize="large"
        >
          <AddIcon />
          Map Services
        </Fab>
      </div>
      <Dialog open={open} onClose={handleClse}>
        <DialogTitle>Add Mapservice(s)</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Please enter wms mapservice here
          </DialogContentText>
          <FormHelperText error={true}>{errorText}</FormHelperText>
          <TextField
            autoFocus
            margin="dense"
            id="layername"
            label="Layer Name"
            fullWidth
            onChange={(e) => {
              setLayers(e.target.value);
              setErrorText("");
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="label"
            label="Label"
            fullWidth
            onChange={(l) => {
              setLabel(l.target.value);
              setErrorText("");
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            onChange={(d) => {
              setDescription(d.target.value);
              setErrorText("");
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="wmslink"
            label="Wms URL"
            fullWidth
            onChange={(e1) => {
              setLink(e1.target.value);
              setErrorText("");
            }}
            placeholder="https://wmsserver/server/work/wms?SERVICE=WMS&REQUEST=GetMap&CRS=EPSG:4326&LAYERS=name"
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClse}>
            cancel
          </Button>
          <Button color="primary" onClick={addChange}>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMapService;
