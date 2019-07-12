import React, { useState } from "react";
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

import { GetSite } from "../MyMap/Request";

import { createdataset } from "../../Api/dataset";

import Datasetdoss from "./Dataset";

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
      // height: 300,
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
    card: {
      maxWidth: "100vw",
      marginTop: 20
    },
    grow: {
      flexGrow: 1
    }
  })
);

const StoreSpace = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  /////////////////////
  const [Name, setName] = useState([]);
  const [Description, setDescription] = useState([]);
  ////
  const CreateDataset = (e) => {
    e.preventDefault();
    GetSite().then((s) => {
      console.log(s);
      createdataset(Name, Description, s.data.site_id).then((cd) => {
        console.log(cd);
      });
    });
  };
  ///////////////////////

  ///////////////////
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
                Create Dataset
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
          </div>
          <br />
          <Divider />
          <br />

          <Datasetdoss />
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
          {"Create Dataset"}
        </DialogTitle>

        <form className={classes.dialogForm}>
          {/*  */}
          <DialogContent>
            <TextField
              id="Name"
              label="Name"
              color="primary"
              fullWidth
              onChange={(n) => {
                setName(n.target.value);
              }}
            />
          </DialogContent>
          {/*  */}
          {/*  */}
          <DialogContent>
            <TextField
              id="Description"
              label="Description"
              fullWidth
              color="primary"
              onChange={(d) => {
                setDescription(d.target.value);
              }}
            />
          </DialogContent>
          {/*  */}
          <DialogActions>
            <Button
              // onClick={handleClose}
              onClick={CreateDataset}
              color="primary"
            >
              OK
            </Button>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default StoreSpace;
