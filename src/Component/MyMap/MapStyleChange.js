import React, { useContext } from "react";
import { CardMedia, CardActionArea, Tooltip } from "@material-ui/core";
import SatImg from "./satellite.PNG";
import { MapContext } from "./MapContext";
import MapStyle from "./Mapstyle";
import StandardImg from "./standard.PNG";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({}));
const MapStyleChange = () => {
  const mapContext = useContext(MapContext);
  const classes = useStyles();

  const ChangeStyleSat = () => {
    const map = mapContext.map;
    map.setStyle("mapbox://styles/mapbox/satellite-streets-v9");
  };
  const ChangeStyleDefault = () => {
    mapContext.map.setStyle(MapStyle);
  };
  return (
    <div>
      <CardActionArea onClick={ChangeStyleDefault}>
        <Tooltip title="Default Style" placement="right">
          <CardMedia
            alt="img"
            image={StandardImg}
            style={{ height: 200, border: "1px solid" }}
          />
        </Tooltip>
      </CardActionArea>
      <CardActionArea onClick={ChangeStyleSat}>
        <Tooltip title="Satellite Style" placement="right">
          <CardMedia
            alt="img"
            image={SatImg}
            style={{ height: 200, border: "1px solid" }}
          />
        </Tooltip>
      </CardActionArea>
    </div>
  );
};

export default MapStyleChange;
