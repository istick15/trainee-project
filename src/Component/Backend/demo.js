import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  Fab
} from "@material-ui/core";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { TextField, Grid } from "@material-ui/core";
import { AddMapLayers, AddRequest } from "../MyMap/Request";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15)
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    },
    icon: {
      verticalAlign: "bottom",
      height: 20,
      width: 20
    },
    details: {
      alignItems: "center"
    },
    column: {
      flexBasis: "33.33%"
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2)
    }
  })
);

export default function AlertDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [layers, setLayers] = useState({});
  const [errorText, setErrorText] = useState("");
  const [description, setDescription] = useState({});
  const [link, setLink] = useState({});
  const [label, setLabel] = useState({});
  const addChange = () => {
    if (layers === "" || label === "" || link === "" || description === "") {
      setErrorText("please input value");
    } else {
      AddMapLayers(layers, description).then((rs) => {
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
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Fab
        variant="outlined"
        size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        <AddIcon />
        Map Services
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Add Mapservice</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter wms mapservice here
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <div className={classes.root}>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1c-content"
                  id="panel1c-header"
                >
                  <div className={classes.column}>
                    <Typography className={classes.heading}>WMS</Typography>
                  </div>
                  <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}>
                      Put your WMS Data
                    </Typography>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                  <Grid>
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
                      label="URL"
                      fullWidth
                      onChange={(e1) => {
                        setLink(e1.target.value);
                        setErrorText("");
                      }}
                      placeholder="https://wmsserver/server/work/wms?SERVICE=WMS&REQUEST=GetMap&CRS=EPSG:4326&LAYERS=name"
                    />
                  </Grid>
                </ExpansionPanelDetails>
                <Divider />
              </ExpansionPanel>
              <ExpansionPanel
              // defaultExpanded
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1c-content"
                  id="panel1c-header"
                >
                  <div className={classes.column}>
                    <Typography className={classes.heading}>TMS</Typography>
                  </div>
                  <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}>
                      Put your TMS Data
                    </Typography>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                  <Grid>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="layername"
                      label="Layer Name"
                      fullWidth
                      // onChange={(e) => {
                      //   setLayers(e.target.value);
                      //   setErrorText("");
                      // }}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="description"
                      label="Description"
                      fullWidth
                      // onChange={(d) => {
                      //   setDescription(d.target.value);
                      //   setErrorText("");
                      // }}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="wmslink"
                      label="URL"
                      fullWidth
                      // onChange={(e1) => {
                      //   setLink(e1.target.value);
                      //   setErrorText("");
                      // }}
                      placeholder="https://wmsserver/server/work/wms?SERVICE=WMS&REQUEST=GetMap&CRS=EPSG:4326&LAYERS=name"
                    />
                  </Grid>
                </ExpansionPanelDetails>
                <Divider />
              </ExpansionPanel>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button onClick={addChange} color="primary" autoFocus>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
