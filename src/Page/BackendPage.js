import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import useReactRouter from "use-react-router";
import LayerBackend from "../Component/Backend/LayerBackend";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  GetDisplay,
  GetSite,
  GetDataset,
  getFeature
} from "../Component/MyMap/Request";
import { MapContext } from "../Component/MyMap/MapContext";
import { FeatureContext } from "../Component/MyMap/FeatureContext";
import { LayerContext } from "../Context/LayerContext";

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
    },
    but: {
      zIndex: 10
    }
  })
);

const BackendPage = () => {
  const classes = useStyles();
  const { history } = useReactRouter();
  const layerContext = useContext(LayerContext);
  const goToMap = () => {
    history.replace("/MapPage");
    GetDisplay().then(rs => {
      console.log(rs.data);
      layerContext.layer = rs.data;
      console.log(layerContext.layer);
    });
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
