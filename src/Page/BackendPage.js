import React from "react";
import { Button } from "@material-ui/core";
import useReactRouter from "use-react-router";
const BackendPage = () => {
  const { history } = useReactRouter();
  const goToMap = () => {
    history.replace("/MapPage");
  };
  return (
    <div>
      <Button color="primary" onClick={goToMap}>
        GO TO MAP PAGEASASA
      </Button>
    </div>
  );
};

export default BackendPage;
