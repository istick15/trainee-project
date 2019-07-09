import React from "react";
import { Button, Grid } from "@material-ui/core";
import useReactRouter from "use-react-router";
import LayerBackend from "../Component/Backend/LayerBackend";
import { createStyles, makeStyles } from "@material-ui/core/styles";
<<<<<<< HEAD
import Torange from "../Img/Torange.jpg";
const useStyles = makeStyles(theme =>
=======

const useStyles = makeStyles((theme) =>
>>>>>>> 7d45ac31d9b0e648eeaaa0bea53831877df5d9ef
  createStyles({
    root: {
      width: 200,
      height: 40,
      marginTop: 100,
      borderRadius: 10
<<<<<<< HEAD
=======
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
>>>>>>> 7d45ac31d9b0e648eeaaa0bea53831877df5d9ef
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
<<<<<<< HEAD
      <LayerBackend />

=======
      <Grid>
        <LayerBackend />
      </Grid>
>>>>>>> 266345c62c1e126b798281efbd9e445fa5b75eb2
>>>>>>> 7d45ac31d9b0e648eeaaa0bea53831877df5d9ef
      <Button color="primary" onClick={goToMap} className={classes.root}>
        GO TO MAP PAGE
      </Button>
    </div>
  );
};

export default BackendPage;
