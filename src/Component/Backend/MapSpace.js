import React, { useState, useContext, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { getMapServices } from "../../Api/GetMap";
import LayerList from "./LayerList";

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
      height: 300,
      padding: theme.spacing(3, 2),
      marginTop: 20,
      borderRadius: 10
    },
    margin: {
      margin: theme.spacing(1)
    },
    dialogForm: {
      flexDirection: "column",
      width: 600
    },
    list: {
      position: "absolute",
      top: "40%",
      width: 880
    }
  })
);

const MapWork = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  //Add Map Services
  const [mapServices, setMapServices] = useState([]);
  const [layerName, setLayerName] = useState({});
  const [desC, setDesC] = useState({});
  const [URL, setURL] = useState({});
  const addLayerMap = () => {
    getMapServices(layerName, desC, URL).then((rs) => {
      // console.log(rs);
    });
  };
  //
  return (
    <div>
      <Grid container justify="center">
        <Paper className={classes.root}>
          <Grid container justify="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Dataset</Typography>
            </Grid>
            <Grid container justify="flex-end" item xs={12} sm={6}>
              <Fab
                variant="outlined"
                size="small"
                color="primary"
                aria-label="Add"
                onClick={handleClickOpen}
              >
                <AddIcon />
                Map Services
              </Fab>
            </Grid>
          </Grid>
          <br />
          <Divider />

          <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
              <SearchIcon />
              <TextField id="Search" label="Search" />
            </Grid>

            <div className={classes.list}>
              <LayerList />
            </div>
          </div>
        </Paper>
      </Grid>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Map Services"}
        </DialogTitle>
        <form className={classes.dialogForm}>
          <DialogContent>
            <TextField
              fullWidth
              id="Name"
              label="Name"
              color="primary"
              onChange={(l) => {
                setLayerName(l.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              id="Description"
              label="Description"
              fullWidth
              color="primary"
              onChange={(d) => {
                setDesC(d.target.value);
              }}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              id="standard-full-width"
              label="URL"
              fullWidth
              onChange={(u) => {
                setURL(u.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" fullWidth>
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              color="primary"
              fullWidth
              onClick={addLayerMap}
            >
              OK
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default MapWork;
