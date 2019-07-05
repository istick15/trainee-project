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
import { AddMapLayers } from "./Request";
const useStyles = makeStyles(theme => ({
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: "93%",
    right: "30%",
    margin: "0 auto"
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
  const [link, setLink] = useState({});
  const [errorText, setErrorText] = useState("");
  const addChange = () => {
    AddMapLayers(layers, link).then(rs => {
      console.log(rs);
      if (rs.Text === "Bad Request") {
        setErrorText("Something wrong pls check");
        setOpen(true);
      } else {
        setOpen(false);
        setErrorText("");
      }
    });
  };
  return (
    <div>
      <Tooltip title="Create Layers" placement="right">
        <Fab color="primary" aria-label="Add" className={classes.fabButton}>
          <CreateIcon onClick={handleOpen} />
        </Fab>
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
            onChange={e => {
              setLayers(e.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            variant="outlined"
            id="wmslink"
            label="Wms"
            type="url"
            fullWidth
            onChange={e1 => {
              setLink(e1.target.value);
            }}
            placeholder="https://example.com"
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClse}>
            cancel
          </Button>
          <Button color="primary" type="submit" onClick={addChange}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMapService;
