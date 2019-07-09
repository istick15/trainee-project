import React from "react";
import { Button } from "@material-ui/core";
import useReactRouter from "use-react-router";
import LayerBackend from "../Component/Backend/LayerBackend";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: 200,
      height: 40,
      marginTop: 100,
      borderRadius: 10
    },
    rot: {
      position: "absolute",
      zIndex: -1,
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(45deg, #F2AD2E , #F27304 ,#0C0C0C )"
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
    <div className={classes.rot}>
      <LayerBackend />
      <Button color="primary" onClick={goToMap} className={classes.root}>
        GO TO MAP PAGE
      </Button>
    </div>
  );
};

export default BackendPage;
