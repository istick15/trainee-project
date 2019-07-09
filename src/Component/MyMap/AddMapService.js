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
  FormHelperText,
  Card,
  CardActionArea,
  Divider,
  CardContent,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import { AddMapLayers, AddRequest } from "./Request";

const useStyles = makeStyles((theme) => ({
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: "2%",
    right: "25%",
    margin: "0 auto",
    "&:hover": {
      backgroundColor: "#F2AD2E"
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
    // if (link === "" || layers === "") {
    //   setErrorText("please input value");
    // } else {
    //   AddMapLayers(layers, description).then(rs => {
    //     if (rs.Text === "Bad Request") {
    //       setErrorText("Something wrong pls check");
    //       setOpen(true);
    //     } else {
    //       setOpen(false);
    //       setErrorText("");
    //     }
    //   });
    // }
    if (layers === "" || label === "" || link === "" || description === "") {
      setErrorText("please input value");
    } else {
      AddMapLayers(layers, label, description).then((rs) => {
        if (rs.data.status === 0) {
          setErrorText("Something wrong pls check");
        } else {
          console.log(rs);
          console.log(rs.data.layer_id);
          AddRequest(link, rs.data.layer_id).then((rq) => {
            if (rq.data.status === 0) {
              setErrorText("pls check URL");
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
      <Tooltip title="Create Layers" placement="right">
        <Card className={classes.fabButton}>
          <CardActionArea onClick={handleOpen}>
            <div align="center">
              <CreateIcon className={classes.icon} fontSize="large" />
            </div>
            <Divider variant="inset" />
            <CardContent>
              <Typography variant="caption">Create</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Tooltip>
      <Dialog open={open} onClose={handleClse}>
        <DialogTitle>Create Mapservice</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Please add the name of layer,and enter wms mapservice here
          </DialogContentText>
          <FormHelperText error={true}>{errorText}</FormHelperText>
          <TextField
            autoFocus
            margin="dense"
            variant="outlined"
            id="layername"
            label="Layer"
            fullWidth
            onChange={(e) => {
              setLayers(e.target.value);
              setErrorText("");
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
            id="wmslink"
            label="Wms"
            fullWidth
            onChange={(e1) => {
              setLink(e1.target.value);
              setErrorText("");
            }}
            placeholder="https://example.com"
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClse}>
            cancel
          </Button>
          <Button color="primary" onClick={addChange}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMapService;
