import { makeStyles } from "@material-ui/styles";
import React, { useState, useContext, useEffect } from "react";
import { GetSite, GetDataset, GetDisplay, getFeature } from "../MyMap/Request";
import {
  MenuItem,
  CardContent,
  Typography,
  Tooltip,
  IconButton,
  Grid
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DeleteDataset } from "../../Api/dataset";
import useReactRouter from "use-react-router";
import { Feature } from "react-mapbox-gl";
import { FeatureContext } from "../MyMap/FeatureContext";
import { LayerContext } from "../../Context/LayerContext";
import { UserContext } from "../../Context/UserContext";
const useStyles = makeStyles({
  grow: {
    flexGrow: 1
    //left: 100
  },
  layerlist: {
    padding: (-3, 1),
    marginTop: -7
    // borderRadius: 10
  },
  test: {
    display: "flex",
    width: "47vw"
  }
});
const Datasetdoss = () => {
  const classes = useStyles();
  /////
  const userContext = useContext(UserContext);
  //////
  const [Dataset, setDataset] = useState([]);
  const layerContext = useContext(LayerContext);
  const featureContext = useContext(FeatureContext);
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

  useEffect(() => {
    // GetSite().then(s => {
    //   console.log(s.data.site_id);
    //   GetDataset(s.data.site_id).then(ds => {
    //     console.log(ds);
    //     // setDataset([ds.data]);
    //     layerContext.layer = ds.data;
    //     console.log(layerContext.layer);
    //   });
    // });
    if (Dataset) {
      GetSite().then(s => {
        console.log(s.data.site_id);
        GetDataset(s.data.site_id).then(ds => {
          console.log(ds);
          setDataset([ds.data]);
          //  layerContext.layer = ds.data;
          //  console.log(layerContext.layer);
        });
      });
    } else {
    }
  }, []);

  const datalist = Dataset.map(key => {
    return (
      <MenuItem key={key.dataset_id} value={key.dataset_name}>
        <CardContent>
          <Grid className={classes.test}>
            <Grid>
              <Typography component="h5" variant="h5">
                {" "}
                {key.dataset_name}
              </Typography>

              <Typography variant="subtitle1" color="textSecondary">
                {key.dataset_description}
              </Typography>
              {/* </CardContent> */}
            </Grid>
            <Grid container justify="flex-end">
              <Tooltip title="Edit">
                <IconButton
                  onClick={e => {
                    history.replace("/MapPage");
                    GetDisplay().then(rs => {
                      console.log(rs.data);
                      layerContext.layer = rs.data;
                      console.log(layerContext.layer);
                    });
                    GetSite().then(s => {
                      GetDataset(s.data.site_id).then(ds => {
                        getFeature(s.data.site_id, ds.data.dataset_id).then(
                          gf => {
                            console.log(gf.data);
                            featureContext.feature = gf.data;
                            console.log(featureContext.feature);
                          }
                        );
                      });
                    });
                  }}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={DeleteData} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              {/*  */}
              {/* </CardContent> */}
              {/*  */}
            </Grid>
          </Grid>
        </CardContent>
      </MenuItem>
    );
  });
  // ////////////////////////////////////////
  // const Data = () => {
  //   GetSite().then(s => {
  //     console.log(s.data.site_id);
  //     GetDataset(s.data.site_id).then(ds => {
  //       console.log(ds);
  //       setDataset([ds.data]);
  //     });
  //   });
  // };
  // const datalist = Dataset.map(key => {
  //   return (
  //     <MenuItem key={key.dataset_id} value={key.dataset_name}>
  //       <CardContent>
  //         <Typography component="h5" variant="h5">
  //           {" "}
  //           {key.dataset_name}
  //         </Typography>
  //         <Typography variant="subtitle1" color="textSecondary">
  //           {key.dataset_description}
  //         </Typography>

  //         <div className={classes.grow}>
  //           {/* <Grid container justify="flex-end"> */}
  //           <Tooltip title="Edit">
  //             <IconButton
  //               onClick={e => {
  //                 history.replace("/MapPage");
  //                 GetDisplay().then(rs => {
  //                   console.log(rs.data);
  //                   layerContext.layer = rs.data;
  //                   console.log(layerContext.layer);
  //                 });
  //                 GetSite().then(s => {
  //                   GetDataset(s.data.site_id).then(ds => {
  //                     getFeature(s.data.site_id, ds.data.dataset_id).then(
  //                       gf => {
  //                         console.log(gf.data);
  //                         featureContext.feature = gf.data;
  //                         console.log(featureContext.feature);
  //                       }
  //                     );
  //                   });
  //                 });
  //               }}
  //               color="primary"
  //             >
  //               <EditIcon />
  //             </IconButton>
  //           </Tooltip>

  //           <Tooltip title="Delete">
  //             <IconButton onClick={DeleteData} color="secondary">
  //               <DeleteIcon />
  //             </IconButton>
  //           </Tooltip>
  //           {/*  */}
  //           {/* </CardContent> */}
  //           {/*  */}
  //           {/* </Grid> */}
  //         </div>
  //       </CardContent>
  //     </MenuItem>
  //   );
  // });
  const { history } = useReactRouter();

  return (
    <div
    // onMouseMove={Data}
    >
      <form direction="vertical" className={classes.layerlist}>
        {datalist}
      </form>
    </div>
  );
};
export default Datasetdoss;
