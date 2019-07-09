import React from "react";
import { Button, Grid } from "@material-ui/core";
import useReactRouter from "use-react-router";
import LayerBackend from "../Component/Backend/LayerBackend";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: 200,
      height: 40,
      marginTop: 100,
      borderRadius: 10
    },
    rot: {
      position: "absolute",
<<<<<<< HEAD
      // zIndex: -1,
      background: "linear-gradient(45deg, #F2AD2E , #F27304 ,#0C0C0C )",
      width: 900,
      height: 300,
      padding: theme.spacing(3, 2),
      marginTop: 100,
      borderRadius: 10
=======
      zIndex: -1,
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(45deg, #F2AD2E , #F27304 ,#0C0C0C )"
    },
    but: {
      zIndex: 10
>>>>>>> 266345c62c1e126b798281efbd9e445fa5b75eb2
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
<<<<<<< HEAD
    <div
    // className={classes.rot}
    >
      <LayerBackend />
=======
    <div>
      <Grid>
        <LayerBackend />
      </Grid>
>>>>>>> 266345c62c1e126b798281efbd9e445fa5b75eb2
      <Button color="primary" onClick={goToMap} className={classes.root}>
        GO TO MAP PAGE
      </Button>
    </div>
  );
};

export default BackendPage;
