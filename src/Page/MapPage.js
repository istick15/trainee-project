import React from "react";
import { Button } from "@material-ui/core";
import useReactRouter from "use-react-router";
import Mymap from "../Component/MyMap/mymap";
const MapPage = () => {
<<<<<<< HEAD
  const { history } = useReactRouter();
  return (
    <div>
      <Button
        onClick={() => {
          history.replace("/");
        }}
      >
        Mappage
      </Button>
=======
  return (
    <div>
>>>>>>> 428684ac94897227536ccd2c1d3f01e63ed27cad
      <Mymap />
    </div>
  );
};

export default MapPage;
