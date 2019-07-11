import React, { useState, useContext } from "react";
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
import TouchAppIcon from "@material-ui/icons/TouchApp";
import useReactRouter from "use-react-router";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Card,
  CardActionArea,
  CardContent,
  Select,
  MenuItem,
  MenuList,
  FormControl,
  FormControlLabel,
  Switch,
  List,
  ListItemIcon,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { GetDataset, GetSite, GetDisplay, getFeature } from "../MyMap/Request";
import { LayerContext } from "../../Context/LayerContext";

import { DeleteDataset, createdataset } from "../../Api/dataset";
import { Feature } from "react-mapbox-gl";
import { FeatureContext } from "../MyMap/FeatureContext";
// import { withRouter } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";

const useStyles = makeStyles(theme =>
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
    card: {
      maxWidth: "100vw",
      marginTop: 20
    }
  })
);

const StoreSpace = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const layerContext = useContext(LayerContext);
  const featureContext = useContext(FeatureContext);
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  /////////////////////
  const [Name, setName] = useState({});
  const [Description, setDescription] = useState({});
  ////
  const CreateDataset = e => {
    e.preventDefault();
    GetSite().then(s => {
      console.log(s);
      createdataset(Name, Description, s.data.site_id).then(cd => {
        console.log(cd);
      });
    });
  };
  ///////////////////////
  const DeleteData = () => {
    GetSite().then(s => {
      // console.log(s);
      GetDataset(s.data.site_id).then(ds => {
        //     console.log(ds);
        if (window.confirm("Are you sure you want to delete this DataSet?")) {
          DeleteDataset(s.data.site_id, ds.data.dataset_id).then(dds => {
            //    console.log(dds);
          });
        }
      });
    });
  };
  /////////////////////////
  const [Dataset, setDataset] = useState([]);

  const Createdataset = () => {
    GetSite().then(s => {
      //    console.log(s.data.site_id);
      GetDataset(s.data.site_id).then(ds => {
        //     console.log(ds);
        setDataset([ds.data]);
      });
    });
  };
  const datalist = Dataset.map(key => {
    return (
      <MenuItem key={key.dataset_id} value={key.dataset_name}>
        <CardContent>
          <Typography component="h5" variant="h5">
            {key.dataset_name}
          </Typography>

          <Typography variant="subtitle1" color="textSecondary">
            {key.dataset_description}
          </Typography>
          <Tooltip title="Edit">
            <IconButton
              onClick={e => {
                history.replace("/MapPage");
                GetDisplay().then(rs => {
                  console.log(rs.data);
                  layerContext.layer = rs.data;
                  console.log(layerContext.layer);
                });
                GetSite().then(s => {
                  GetDataset(s.data.site_id).then(ds => {
                    getFeature(s.data.site_id, ds.data.dataset_id).then(gf => {
                      console.log(gf.data);
                      featureContext.feature = gf.data;
                      console.log(featureContext.feature);
                    });
                  });
                });
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            {/*  */}
            <IconButton onClick={DeleteData}>
              <DeleteIcon />
            </IconButton>
            {/*  */}
          </Tooltip>
        </CardContent>
      </MenuItem>
    );
  });

  const { history } = useReactRouter();

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
          {/*  */}
          <Card className={classes.card}>
            <CardContent>
              <Button onClick={Createdataset}>
                Dataset
                {/* <ListItemIcon> */}
                <TouchAppIcon />
                {/* </ListItemIcon> */}
              </Button>
              <CardActionArea>{datalist}</CardActionArea>
            </CardContent>
          </Card>

          {/*  */}
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
              onChange={n => {
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
              onChange={d => {
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
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default StoreSpace;
