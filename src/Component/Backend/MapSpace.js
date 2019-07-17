import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { Switch } from "@material-ui/core";
import LayerList2 from "./LayerList2";
import AddLayer from "./AddLayer";
import LayerList from "./LayerList";

// import AddMapService from "./AddMapServices";

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
    Field: {
      width: 900,
      height: 400,
      padding: theme.spacing(3, 2),
      marginTop: 100,
      borderRadius: 10
    },
    layerlist: {
      padding: theme.spacing(-3, 1),
      marginTop: -7
    }
  })
);

const MapWork = () => {
  const classes = useStyles();
  function handleMapChange(event) {
    setValue(event.target.value);
  }
  const [value, setValue] = React.useState("");

  const newWMS = (LayerInput, InputURL) => {
    setWMSState({
      ...WMSState,
      list: [...WMSState.list, LayerInput],
      url: [...WMSState.url, InputURL]
    });
  };
  const [WMSState, setWMSState] = useState({
    list: [],
    panes: [],
    url: []
  });

  return (
    <div>
      <Grid container justify="center">
        <Paper className={classes.root}>
          <Grid container justify="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h5">Dataset</Typography>
            </Grid>
            <Grid container justify="flex-end" item xs={12} sm={6}>
              <AddLayer />
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
          <div>
            <Grid container spacing={1} alignItems="center" />
          </div>
          <div direction="vertical" className={classes.layerlist}>
            <LayerList2 />
            {/* <LayerList /> */}
          </div>
        </Paper>
      </Grid>
    </div>
  );
};
export default MapWork;
