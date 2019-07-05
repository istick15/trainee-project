import React from "react";
import { Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddLocation from "@material-ui/icons/AddLocation";

const useStyles = makeStyles(theme => ({
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: "1%",
    right: "30%",
    margin: "0 auto"
  }
}));
const CreateMarker = () => {
  const classes = useStyles();

  return (
    <div>
      <Fab color="primary" aria-label="Add" className={classes.fabButton}>
        <AddLocation />
      </Fab>
    </div>
  );
};

export default CreateMarker;
