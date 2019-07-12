import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Paper, Fade, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditLocation";
import { FeatureDataContext } from "../../Context/FeatureDataContext";

import { FeatureContext } from "./FeatureContext";
const useStyles = makeStyles(theme => ({
  icon: {
    position: "absolute",
    right: "1%",
    top: "1%",
    zIndex: 1
  },
  Paper: {
    position: "absolute",
    right: "4%",
    top: "1%",
    zIndex: 1,
    width: 200,
    height: 200
  }
}));
const EditFeature = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const featureContext = useContext(FeatureContext);
  const featureDataContext = useContext(FeatureDataContext);
  const handleChange = () => {
    setOpen(!open);
  };
  const featuresshow = featureDataContext.data.map(key => {
    // return {
    //   id: key.properties.id,
    //   name: key.properties.name,
    //   description: key.properties.description,
    //   coordinates:
    //     "[" +
    //     key.geometry.coordinates[0] +
    //     "," +
    //     key.geometry.coordinates[1] +
    //     "]"
    // };

    return (
      <div key={key.properties.id}>
        <TextField label="id" value={key.properties.id} />
      </div>
    );
  });
  return (
    <div>
      <IconButton className={classes.icon} onClick={handleChange}>
        <EditIcon />
      </IconButton>
      <Fade in={open}>
        <Paper className={classes.Paper}>{featuresshow}</Paper>
      </Fade>
    </div>
  );
};

export default EditFeature;
