import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  Button,
  IconButton
} from "@material-ui/core";
import { GetDisplay } from "../MyMap/Request";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles(theme => ({
  card: {},
  iconbtn: {
    color: "red",
    position: "absolute",
    right: "1%",
    zIndex: 1,
    top: "10%"
  }
}));

const LayerList = () => {
  const [listlayer, setListLayer] = useState([]);
  const classes = useStyles();

  GetDisplay().then(rs => {
    console.log(rs);
    console.log(rs.data);
    if (rs.data.length === undefined) {
      setListLayer([rs.data]);
    } else {
      setListLayer(rs.data);
    }
  });

  const list = listlayer.map(key => {
    return (
      <Card key={key.layer_id} className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography>{key.layer_name}</Typography>
          </CardContent>
          <IconButton className={classes.iconbtn}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CardActionArea>
      </Card>
    );
  });
  return <div>{list}</div>;
};

export default LayerList;
