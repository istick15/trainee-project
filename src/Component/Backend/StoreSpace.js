import React, { useState, useEffect, useContext } from "react";
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
import { GetDataset } from "../MyMap/Request";
import { GetSite } from "../MyMap/Request";
import { DeleteDataset } from "../../Api/dataset";
import { createdataset } from "../../Api/dataset";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
//import Datasetdoss from "./Dataset";
//import { UserContextProvider } from "../../Context/UserContext";
import { MenuItem, CardContent, Tooltip, IconButton } from "@material-ui/core";
import useReactRouter from "use-react-router";
import { FeatureContext } from "../MyMap/FeatureContext";
import { LayerContext } from "../../Context/LayerContext";
import { GetDisplay, getFeature } from "../MyMap/Request";

///

////
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
    },
    layerlist: {
      padding: (-3, 1),
      marginTop: -7
    },
    test: {
      display: "flex"
    },

    nono: {
      width: "100vh"
    },
    yes: {
      color: "#76ff03"
    },
    no: {
      color: "#d50000"
    },
    leftIconyes: {
      marginRight: theme.spacing(1),
      color: "#76ff03"
    },
    leftIconno: {
      marginRight: theme.spacing(1),
      color: "#d50000"
    },
    bin: {
      height: 150,
      width: 150,
      color: "#F2AD2E"
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
  ///////////////////
  const [tsover, settsover] = useState(false);
  function testopen() {
    settsover(true);
  }
  function testclose() {
    settsover(false);
  }

  /////////////////////
  const [Name, setName] = useState([]);
  const [Description, setDescription] = useState([]);
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
      GetDataset(s.data.site_id).then(ds => {
        //    if (window.confirm("Are you sure you want to delete this DataSet?")) {
        DeleteDataset(s.data.site_id, ds.data.dataset_id).then(dds => {
          console.log(dds);
        });
        //   }
      });
    });
  };
  //

  const { history } = useReactRouter();
  const layerContext = useContext(LayerContext);
  const featureContext = useContext(FeatureContext);
  const [Dataset, setDataset] = useState([]);
  useEffect(() => {
    if (Dataset) {
      GetSite().then(s => {
        console.log(s.data.site_id);
        GetDataset(s.data.site_id).then(ds => {
          console.log(ds);
          setDataset([ds.data]);
          //  layerContext.layer = ds.data;
          //  console.log(layerContext.layer);
        });
      });
    } else {
    }
  }, []);

  const datalist = Dataset.map(key => {
    return (
      <div>
        <MenuItem key={key.dataset_id} value={key.dataset_name}>
          <CardContent className={classes.nono}>
            <Grid className={classes.test}>
              <Grid className={classes.num1}>
                <Typography component="h5" variant="h5">
                  {key.dataset_name}
                </Typography>

                <Typography variant="subtitle1" color="textSecondary">
                  {key.dataset_description}
                </Typography>
                {/* </CardContent> */}
              </Grid>
              <Grid container justify="flex-end" className={classes.num2}>
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
                          getFeature(s.data.site_id, ds.data.dataset_id).then(
                            gf => {
                              console.log(gf.data);
                              featureContext.feature = gf.data;
                              console.log(featureContext.feature);
                            }
                          );
                        });
                      });
                    }}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="secondary"
                    // onClick={DeleteData}
                    onClick={testopen}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </CardContent>
        </MenuItem>
      </div>
    );
  });
  ///////////////////
  return (
    <div>
      {/*  */}
      <div>
        <Dialog
          open={tsover}
          keepMounted
          onClose={testclose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title" color="#F2AD2E">
            <Grid container justify="center">
              <Typography variant="h4" className={classes.no}>
                Do you want to delete Dataset?
              </Typography>
            </Grid>
          </DialogTitle>
          <Grid container justify="center">
            <DeleteSweepIcon className={classes.bin} />
          </Grid>
          <Button
            variant="outlined"
            size="medium"
            className={classes.yes}
            onClick={DeleteData}
          >
            <CheckIcon className={classes.leftIconyes} /> Yes
          </Button>
          <br />
          <Button
            variant="outlined"
            size="medium"
            className={classes.no}
            onClick={testclose}
          >
            <CloseIcon className={classes.leftIconon} /> No
          </Button>
        </Dialog>
      </div>
      {/*  */}
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
          {/*  */}
          {/* <UserContextProvider>
            <Datasetdoss />
          </UserContextProvider> */}
          {/* test */}
          <div>
            <form direction="vertical" className={classes.layerlist}>
              {datalist}
            </form>
          </div>
          {/*  */}
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
