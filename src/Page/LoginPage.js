import React, { useState } from "react";
import { Button } from "@material-ui/core";
import useReactRouter from "use-react-router";
import { makeStyles } from "@material-ui/styles";
import { Grid, TextField, Paper, FormControl } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import ErrorIcon from "@material-ui/icons/Error";
import clsx from "clsx";
import { testLogin } from "../Api/authen";
import Rooftop from "../Img/Rooftop.jpeg";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import logonewvallaris from "../Img/logonewvallaris.png";
//import CircularProgress from "@material-ui/core/CircularProgress";
const userStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    zIndex: -2,
    background: "linear-gradient(45deg, #F2AD2E , #F27304 ,#0C0C0C )"
  },
  formControl: {
    margin: "40px"
  },
  ////
  container: { width: "100vw" },
  item: { display: "flex", justifyContent: "center" },
  input: { width: 400 },
  btn: { margin: 16, textTransform: "unset", borderRadius: "15px" },
  cen: {
    alignItems: "center"
  },

  styggpa1: { backgroundcolor: "rgba(192,192,192,0.3)" },
  containerbg: {},
  avalogo: {
    width: "100px",
    height: "100px",
    opacity: 1
  },
  ///1
  stypaper: {
    width: "35vw",
    //background: "linear-gradient(45deg, #F2AD2E 30%, #F27304 80%)",
    height: "80vh",
    position: "static"
  },
  //2
  sttpaperbg: {
    width: "35vw",
    height: "80vh",
    opacity: 0.9,
    zIndex: 1,
    backgroundImage: `url(${Rooftop})`
  },
  ///sum
  paaper: {
    width: "80vw",
    height: "80vh",
    zIndex: 1,
    positions: "flexe"
  },
  stytext: { zIndex: 4, opacity: 1 },

  bg: {
    width: "100%",
    height: "80vh"
  },
  test1: {
    left: 240,
    top: 110,
    color: " #F2AD2E "
  },
  test2: {
    //position: "absolute",
    zIndex: 10,
    left: 240,
    top: 220,
    color: " #F2AD2E "
  },
  test3: {
    // display: "flex",
    position: "absolute",

    left: 725,
    top: 240
  },
  test4: {
    position: "absolute",
    //  zIndex: 10
    left: 725,
    top: 500
  },
  test5: {
    marginLeft: "120px"
  },
  pointer: { cursor: "pointer" }
});
////
const useStyles1 = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));
function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant } = props;
  const Icon = ErrorIcon;
  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
    />
  );
}
///
const LoginPage = props => {
  const classes = userStyles();
  const { history } = useReactRouter();

  ///
  const [snkbar, setsnkbar] = useState(false);
  const [snkbarText, setsnkbarText] = useState();
  const [stateForm, setstateForm] = useState({ email: "", password: "" });
  const handlerChange = event => {
    setstateForm({ ...stateForm, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setstateForm({ ...stateForm, showPassword: !stateForm.showPassword });
  };
  //////
  const goToBackend = e => {
    e.preventDefault();
    testLogin(stateForm.email, stateForm.password).then(rs => {
      console.log(rs);

      if (rs.error) {
        setsnkbarText(rs.error);
        setsnkbar(true);

        if (stateForm.password === "") {
          setsnkbar(true);
          setsnkbarText("Please enter your password.");
        }
      }
      if (rs.data) {
        localStorage.setItem("user_token", rs.data.user_token);
        localStorage.setItem("user_id", rs.data.user_id);

        props.history.push("/Backend");
      }

      console.log(localStorage);
      ///
      // history.push("/Backend");
    });
  };

  ///
  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setsnkbar(false);
  }
  //

  return (
    <div className={classes.root}>
      <form onSubmit={goToBackend}>
        <Grid container spacing={0} className={classes.container}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.cen}
          >
            {/* <Paper /*className={classes.paaper}/> */}
            {/* 1 */}
            {/* <List> */}

            <Paper>
              <Paper className={classes.sttpaperbg}>
                {/* <Grid className={classes.styggpa} /> */}
                <Grid className={classes.stytext} />
                <Grid xs={12}>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <Grid xs={12} className={classes.test1}>
                      <Typography variant="h3" gutterBottom>
                        Welcome to <br />
                        Vallaris Maps
                      </Typography>
                    </Grid>
                    <Grid xs={12} className={classes.test2}>
                      <Typography variant="h6" gutterBottom>
                        Geographic solutions on cloud
                      </Typography>
                    </Grid>
                  </FormControl>
                </Grid>
              </Paper>
            </Paper>
            {/*  */}

            {/* 2 */}
            <Paper className={classes.stypaper}>
              <br />
              <Grid container justify="center" alignItems="center">
                <List>
                  <img
                    src={logonewvallaris}
                    alt=" "
                    className={classes.avalogo}
                  />
                  <Typography variant="h4" gutterBottom>
                    Vallaris
                  </Typography>
                </List>
              </Grid>
              {/*  */}
              {/* <Grid xs={12} container justify="center" alignItems="center">
                <Grid
                  xs={10}
                  container
                  justify="flex-start"
                  alignItems="center"
                >
                  <Typography variant="h6" display="flex" gutterBottom>
                    Login
                  </Typography>
                </Grid>
              </Grid> */}
              <br />

              <Grid item xs={12} className={classes.item}>
                <TextField
                  type="text"
                  id="email"
                  label="E-mail"
                  name="email"
                  className={classes.input}
                  variant="outlined"
                  margin="normal"
                  value={stateForm.email}
                  onChange={handlerChange}
                />
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <TextField
                  type={stateForm.showPassword ? "text" : "password"}
                  id="password"
                  label="Password"
                  name="password"
                  className={classes.input}
                  variant="outlined"
                  margin="normal"
                  value={stateForm.password}
                  onChange={handlerChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                        >
                          {stateForm.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <br />
              <Grid
                container
                item
                xs={12}
                className={classes.item}
                direction="row"
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.input}
                >
                  Login
                </Button>
              </Grid>

              {/* <Grid xs={12} container justify="center" alignItems="flex-end">
                <Typography variant="h7" gutterBottom>
                  Don't have an account yet?
                  <Link className={classes.pointer} onclick={register}>
                    Create it here
                  </Link>
                </Typography>
              </Grid> */}
              <br />
            </Paper>

            <Snackbar
              maxSnack={3}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              open={snkbar}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <MySnackbarContentWrapper
                onClose={handleClose}
                variant="error"
                message={snkbarText}
              />
            </Snackbar>
          </Grid>

          {/* <TextField label="username" />
        <TextField label="password" />
        <Button onClick={goToBackend}>Logidffffn</Button> */}
        </Grid>
      </form>
    </div>
  );
};

export default LoginPage;
