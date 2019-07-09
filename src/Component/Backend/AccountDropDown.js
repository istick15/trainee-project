import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import UserIcon from "@material-ui/icons/AccountCircle";
import { Divider } from "@material-ui/core";
import SettingIcon from "@material-ui/icons/Settings";
import LogoutIcon from "@material-ui/icons/Compare";
import useReactRouter from "use-react-router";
import { SignOut } from "../MyMap/Request";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      right: "200px"
    },
    root: {
      width: 150,
      height: 100,
      borderRadius: 5
    },
    user: {
      height: 33,
      width: 35
    }
  })
);

const SplitButton = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { history } = useReactRouter();
  function handleToggle() {
    setOpen((prevOpen) => !prevOpen);
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  const LogOut = () => {
    SignOut().then((lg) => {
      console.log(lg);
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      history.replace("/");
    });
  };
  return (
    <div>
      <Grid item xs={12} align="center">
        <UserIcon
          ButtonGroup
          variant="contained"
          color="primary"
          ref={anchorRef}
          aria-label="Split button"
          className={classes.user}
          onClick={handleToggle}
        />
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper id="menu-list-grow" className={classes.root}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    <Grid>
                      <MenuItem>
                        <Grid container justify="flex-start">
                          Setting
                        </Grid>
                        <Grid container justify="flex-end">
                          <SettingIcon />
                        </Grid>
                      </MenuItem>
                    </Grid>
                    <Divider />
                    <Grid>
                      <MenuItem onClick={LogOut}>
                        <Grid container justify="flex-start">
                          Log out
                        </Grid>
                        <Grid container justify="flex-end">
                          <LogoutIcon onClick={LogOut} />
                        </Grid>
                      </MenuItem>
                    </Grid>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </div>
  );
};
export default SplitButton;
