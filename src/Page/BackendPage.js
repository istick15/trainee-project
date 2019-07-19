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
import { MapContext } from "../../src/Component/MyMap/MapContext";
import { FeatureContext } from "../Component/MyMap/FeatureContext";
import { LayerContext } from "../Context/LayerContext";
import Demo from "../Component/Backend/demo";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // width: 200,
      // height: 40,
      marginTop: 100
      // borderRadius: 10
      // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
      // backgroundcolor: "#F2AD2E"
    },
    rot: {
      // position: "absolute",
      // zIndex: -1,
      // width: "100vw",
      // height: "100vh",
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
      // background: "linear-gradient(45deg, #F2AD2E , #F27304 ,#0C0C0C )"
    },
    but: {
      zIndex: 10
    },
    demo: {
      // width: 200,
      // height: 40,
      marginTop: 400
      // borderRadius: 10
      // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
      // backgroundcolor: "#F2AD2E"
    }
  })
);

const BackendPage = () => {
  const classes = useStyles();
  const { history } = useReactRouter();
  const layerContext = useContext(LayerContext);
  const featureContext = useContext(FeatureContext);
  const goToMap = () => {
    history.replace("/MapPage");
    GetDisplay().then((rs) => {
      console.log(rs.data);
      layerContext.layer = rs.data;
      console.log(layerContext.layer);
    });

    GetSite().then((s) => {
      GetDataset(s.data.site_id).then((ds) => {
        getFeature(s.data.site_id, ds.data.dataset_id).then((gf) => {
          console.log(gf.data);
          featureContext.feature = gf.data;
          console.log(featureContext.feature);
        });
      });
    });
  };
  return (
    <div>
      <LayerBackend />

      <Button
        // variant="outlined"
        color="defualt"
        onClick={goToMap}
        className={classes.root}
      >
        GO TO MAP PAGE
      </Button>
      {/* <Demo className={classes.root} /> */}
    </div>
  );
};

export default BackendPage;
