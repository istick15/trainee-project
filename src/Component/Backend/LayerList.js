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
import {
  GetDisplay,
  DeleteLayers,
  DeleteRequest,
  GetLayer
} from "../MyMap/Request";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles((theme) => ({
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

  const Delete = () => {
    //เรียกlayerแล้วค่อยลบ
    GetDisplay().then((rs) => {
      console.log(rs.data);
      console.log(rs.data[0].layer_id);
      // DeleteLayers(rs.data[0].layer_id).then(dl => {
      //   console.log(dl);
      // });
      // DeleteRequest(rs.data.layer_id, rs.data[0].service[0].request_id).then(
      //   dr => {
      //     console.log(dr);
      //   }
      // );
    });
  };
  const list = listlayer.map((key, index) => {
    return (
      <Card key={key.layer_id} className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography>{key.layer_name}</Typography>
          </CardContent>
          <IconButton
            className={classes.iconbtn}
            onClick={() => {
              GetDisplay().then((rs) => {
                console.log(rs.data);
                console.log(rs.data[index].service[0].request_id);
                // DeleteLayers(rs.data[index].layer_id).then(dl => {
                //   console.log(dl);
                // });
                // DeleteRequest(rs.data.layer_id, rs.data[index].service[0].request_id).then(
                //   dr => {
                //     console.log(dr);
                //   }
                // );
              });
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CardActionArea>
      </Card>
    );
  });
  return (
    <div>
      <form direction="vertical" className={classes.layerlist}>
        {list}
      </form>
    </div>
  );
};

export default LayerList;
