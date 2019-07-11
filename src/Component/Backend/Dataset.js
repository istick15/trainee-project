import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { GetSite, GetDataset } from "../MyMap/Request";
import {
  MenuItem,
  CardContent,
  Typography,
  Tooltip,
  IconButton
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DeleteDataset } from "../../Api/dataset";
import useReactRouter from "use-react-router";
const useStyles = makeStyles({
  grow: {
    flexGrow: 1
  },
  layerlist: {
    padding: (-3, 1),
    marginTop: -7
    // borderRadius: 10
  }
});
const Datasetdoss = () => {
  const classes = useStyles();
  const [Dataset, setDataset] = useState([]);
  const DeleteData = () => {
    GetSite().then(s => {
      GetDataset(s.data.site_id).then(ds => {
        if (window.confirm("Are you sure you want to delete this DataSet?")) {
          DeleteDataset(s.data.site_id, ds.data.dataset_id).then(dds => {
            console.log(dds);
          });
        }
      });
    });
  };
  const Data = () => {
    GetSite().then(s => {
      console.log(s.data.site_id);
      GetDataset(s.data.site_id).then(ds => {
        console.log(ds);
        setDataset([ds.data]);
      });
    });
  };
  const datalist = Dataset.map(key => {
    return (
      <MenuItem key={key.dataset_id} value={key.dataset_name}>
        <CardContent>
          <Typography component="h5" variant="h5">
            {" "}
            {key.dataset_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {key.dataset_description}
          </Typography>
        </CardContent>
        <div className={classes.grow}>
          <Tooltip title="Edit">
            <IconButton
              onClick={e => {
                history.replace("/MapPage");
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={DeleteData}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </MenuItem>
    );
  });
  const { history } = useReactRouter();
  return (
    <div onMouseMove={Data}>
      <form direction="vertical" className={classes.layerlist}>
        {datalist}
      </form>
    </div>
  );
};
export default Datasetdoss;
