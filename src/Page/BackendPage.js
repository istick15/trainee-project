import React from "react";
import { Button, Grid } from "@material-ui/core";
import useReactRouter from "use-react-router";
import LayerBackend from "../Component/Backend/LayerBackend";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Torange from "../Img/Torange.jpg";
const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: 200,
      height: 40,
      marginTop: 100,
      borderRadius: 10
    }
  })
);

const BackendPage = () => {
  const classes = useStyles();
  const { history } = useReactRouter();
  const goToMap = () => {
    history.replace("/MapPage");
  };
  return (
    <div>
      <LayerBackend />

      <Button color="primary" onClick={goToMap} className={classes.root}>
        GO TO MAP PAGE
      </Button>
    </div>
  );
};

export default BackendPage;
