import React, { useState, useContext, forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Fade, TextField, FormControl } from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditLocation";
import { FeatureDataContext } from "../../Context/FeatureDataContext";
import MUIDataTable from "mui-datatables";
import { FeatureContext } from "./FeatureContext";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const useStyles = makeStyles(theme => ({
  icon: {
    position: "absolute",
    right: "1%",
    top: "1%",
    zIndex: 1
  },
  Paper: {
    position: "absolute",
    right: "4%",
    top: "1%",
    zIndex: 1,
    width: "auto",
    height: "auto"
  }
}));
const EditFeature = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [attribute, setAttribute] = useState({
    colums: [
      { title: "ID", field: "id" },
      { title: "Name", field: "name" },
      { title: "Description", field: "description" },
      { title: "Coordinates", field: "coordinates" }
    ]
  });
  // const featureContext = useContext(FeatureContext);
  const featureDataContext = useContext(FeatureDataContext);
  const handleChange = () => {
    setOpen(!open);
  };
  const featuresshow = featureDataContext.data.map(key => {
    // return (
    //   <div key={key.properties.id}>
    //     <FormControl>
    //       <TextField label="id" value={key.properties.id} />
    //       <TextField label="name" value={key.properties.name} />
    //       <TextField label="coordinates" value={key.geometry.coordinates} />
    //       <TextField label="description" value={key.properties.description} />
    //     </FormControl>
    //   </div>
    // );

    return {
      id: key.properties.id,
      name: key.properties.name,
      description: key.properties.description,
      coordinates:
        "[" +
        key.geometry.coordinates[0] +
        "," +
        key.geometry.coordinates[1] +
        "]"
    };
  });
  const data = featuresshow;
  console.log(data);
  return (
    <div>
      <IconButton className={classes.icon} onClick={handleChange}>
        <EditIcon />
      </IconButton>
      <Fade in={open}>
        <div className={classes.Paper}>
          <MaterialTable
            title="Edit"
            icons={tableIcons}
            columns={attribute.colums}
            data={featuresshow}
          />
        </div>
        {/* <Card className={classes.Paper}>
          <CardContent>{data}</CardContent>
        </Card> */}
      </Fade>
    </div>
  );
};

export default EditFeature;
