import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import MapSpace from "./MapSpace";
// import Avatar from "@material-ui/core/Avatar";
import Logo from "../../Img/logonewvallaris.png";
// import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AccountDropDown from "./AccountDropDown";
import StoreSpace from "./StoreSpace";
// import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
// import { NativeRouter, Route, Link } from "react-router-native";
// import { StyleSheet, Text, View } from "react-native";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    logo: {
      height: 50,
      width: 50,
      marginTop: 2,
      padding: theme.spacing(1, 0)
    },
    margin: {
      margin: theme.spacing(1.5),
      padding: "0px 20px",
      marginTop: 20
    },
    pAvatar: {
      margin: 10,
      color: "#263238"
    },
    account: {
      marginTop: 10
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

const TestAppBar = () => {
  const classes = useStyles();
  // function Child({ match }) {
  //   return <Text>ID: {match.params.id}</Text>;
  // }
  return (
    <div>
      <Router>
        <div className={classes.root}>
          <AppBar position="fixed" color="default">
            <Toolbar>
              <Grid container justify="center" spacing={5}>
                <Grid item xs={6} sm={3} justify="flex-start">
                  <div>
                    <Link to="/store">
                      <Fab
                        variant="outlined"
                        size="medium"
                        color="primary"
                        aria-label="Add"
                        className={classes.margin}
                      >
                        {/* <StoreIcon />  */}
                        Store
                      </Fab>
                    </Link>
                    <Link to="/mapservices">
                      <Fab
                        variant="outlined"
                        size="small"
                        color="primary"
                        aria-label="Add"
                        className={classes.margin}
                      >
                        Map Services
                      </Fab>
                    </Link>
                    <Fab
                      variant="outlined"
                      size="small"
                      color="primary"
                      aria-label="Add"
                      className={classes.margin}
                    >
                      Manage
                    </Fab>
                  </div>
                </Grid>
                <Grid container justify="center" item xs={6} sm={3}>
                  <img src={Logo} alt="" className={classes.logo} />
                </Grid>
                <Grid container item xs={6} sm={3} justify="flex-end">
                  <Grid className={classes.account}>
                    <IconButton size="small" className={classes.button}>
                      <AccountDropDown />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>

        <div>
          <Route exact path="/mapservices" component={MapSpace} />
          <Route path="/store" component={StoreSpace} />
        </div>
        {/* <Route path="/:id" component={Child} /> */}
      </Router>
    </div>
  );
};
export default TestAppBar;