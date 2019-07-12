import React, { useState, useContext, useEffect } from "react";
import {
  Switch,
  MenuItem,
  Card,
  CardActions,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getMapLayers, GetDisplay } from "../MyMap/Request";
import { MapContext } from "../../Context/MapContext";
import DeleteIcon from "@material-ui/icons/DeleteSweep";
//import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Workspace from "./WorkSpace";
import { LayerContext } from "../../Context/LayerContext";
import { Paper } from "material-ui";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 50
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: "2%",
    left: "6%",
    margin: "0 auto"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: 300
  },
  icon: {
    "&:hover": {
      color: "#F2AD2E"
    }
  }
}));

const SelectLayers = () => {
  const classes = useStyles();
  const mapContext = useContext(MapContext);

  const layerContext = useContext(LayerContext);

  useEffect(() => {
    if ((layerContext.layer = [])) {
      GetDisplay().then((dp) => {
        layerContext.layer = dp.data;
        console.log(layerContext.layer);
      });
    } else {
    }
  }, []);

  const MapServices = layerContext.layer.map((key) => {
    return (
      <MenuItem key={key.layer_id} value={key.layer_name}>
        {key.layer_label}
      </MenuItem>
    );
  });

  const [layers, setLayers] = useState({ wms: [] });

  const wmsLayers = layers.wms.map((key) => {
    return (
      <div key={key.layer_id}>
        <Card>
          <MenuItem
            control={<Switch value={key.layer_name} />}
            label={key.layer_label}
            onChange={() => {
              const layerid = key.layer_name;
              const layerlink = key.service[0].request_url;
              console.log(layerlink);
              const map = mapContext.map;
              const check = map.getStyle();
              const filter = check.layers.filter((re) => re.id === layerid);
              const linkcut = layerlink.split("?");
              const linknew = new URL(layerlink, "https://example.com");

              var SERVICE = "SERVICE=WMS";
              var transparent =
                "transparent=" + linknew.searchParams.get("transparent");
              var VERSION = "VERSION=" + linknew.searchParams.get("VERSION");
              var REQUEST = "REQUEST=" + linknew.searchParams.get("REQUEST");
              var CRS = "CRS=" + linknew.searchParams.get("CRS");
              var WIDTH = "WIDTH=" + linknew.searchParams.get("WIDTH");
              var HEIGHT = "HEIGHT=" + linknew.searchParams.get("HEIGHT");
              var FORMAT = "FORMAT=" + linknew.searchParams.get("FORMAT");
              var TILED = "TILED=" + linknew.searchParams.get("TILED");
              var STYLES =
                "STYLES&LAYERS=" + linknew.searchParams.get("LAYERS");
              var bbox = "bbox=" + linknew.searchParams.get("bbox");

              if (transparent === "transparent=null") {
                transparent = "transparent=true";
              }
              if (VERSION === "VERSION=null") {
                VERSION = "VERSION=" + linknew.searchParams.get("version");
              }
              if (REQUEST === "REQUEST=null") {
                REQUEST = "REQUEST=" + linknew.searchParams.get("request");
              }

              if (WIDTH === "WIDTH=null") {
                WIDTH = "WIDTH=" + linknew.searchParams.get("width");
              }
              if (HEIGHT === "HEIGHT=null") {
                HEIGHT = "HEIGHT=" + linknew.searchParams.get("height");
              }
              if (FORMAT === "FORMAT=null") {
                FORMAT = "FORMAT=" + linknew.searchParams.get("format");
              }
              if (TILED === "TILED=null") {
                TILED = "TILED=" + linknew.searchParams.get("tiled");
              }
              if (STYLES === "STYLES&LAYERS=null") {
                STYLES = "STYLES&LAYERS=" + linknew.searchParams.get("layers");
              }
              if (bbox !== "{bbox-epsg-3857}") {
                bbox = "bbox={bbox-epsg-3857}";
              }

              if (CRS !== "EPSG:3857") {
                CRS = "CRS=EPSG:3857";
              }
              var LinkAdd =
                linkcut[0] +
                "?" +
                SERVICE +
                "&" +
                transparent +
                "&" +
                VERSION +
                "&" +
                REQUEST +
                "&" +
                CRS +
                "&" +
                WIDTH +
                "&" +
                HEIGHT +
                "&" +
                FORMAT +
                "&" +
                TILED +
                "&" +
                STYLES +
                "&" +
                bbox;
              if (
                LinkAdd ===
                  "s?SERVICE=WMS&transparent=true&VERSION=null&REQUEST=null&CRS=EPSG:3857&WIDTH=null&HEIGHT=null&FORMAT=null&TILED=null&STYLES&LAYERS=null&bbox={bbox-epsg-3857}" ||
                LinkAdd ===
                  "http://dev.i-bitz.co.th:30001/Kaen/wms?SERVICE=WMS&transparent=true&VERSION=1.1.0&REQUEST=GetMap&CRS=EPSG:3857&WIDTH=256&HEIGHT=256&FORMAT=image/png&TILED=TRUE&STYLES&LAYERS=RailStation&bbox={bbox-epsg-3857}"
              ) {
                alert("Link is incorrect");
              }
              console.log(LinkAdd);
              if (filter.length === 0) {
                map.addLayer({
                  id: layerid,
                  type: "raster",
                  source: {
                    type: "raster",
                    tiles: [LinkAdd],
                    tileSize: 256
                  },
                  paint: {}
                });

                map.setLayoutProperty(layerid, "visibility", "visible");
              } else {
                map.removeLayer(layerid);
                map.removeSource(layerid);
              }
            }}
          />
        </Card>
      </div>
    );
  });

  const [open, setOpen] = useState(false);
  const [change, setChange] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setChange(e.target.value);
    setError(false);
    setTextError("");

    if (e.target.value === "") {
      setError(true);
      setTextError("please select your layer");
    } else {
      const input = layerContext.layer.filter(
        (re) => re.layer_name === e.target.value
      )[0];
      console.log(input);
      setLayers({ ...layers, wms: [...layers.wms, input] });
      const remian = layerContext.layer.filter(
        (c) => c.layer_name !== e.target.value
      );
      layerContext.layer = remian;
      // setWms(remian);
    }
  };

  const [error, setError] = useState(false);
  const [textError, setTextError] = useState("");

  return (
    <div>
      <Workspace />
    </div>
  );
};

export default SelectLayers;
