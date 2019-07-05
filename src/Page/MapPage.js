import React from "react";
//import { Button } from "@material-ui/core";
//import useReactRouter from "use-react-router";
import Mymap from "../Component/MyMap/mymap";
const MapPage = () => {
  //const { history } = useReactRouter();
  return (
    <div>
      {/* <Button
        onClick={() => {
          history.replace("/");
        }}
      >
        Mappage
      </Button> */}
      <Mymap />
    </div>
  );
};

export default MapPage;
