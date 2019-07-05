import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import LocationDisabledIcon from "@material-ui/icons/LocationDisabled";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import { MapContext } from "./MapContext";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import { useFullscreen } from "@straw-hat/react-fullscreen";

const useStyles = makeStyles(theme => ({
  toolsPosition: {
    position: "absolute",
    zIndex: "1",
    bottom: "1%",
    right: "1%"
  }
}));

const MapTools = () => {
  const classes = useStyles();
  const [state, setState] = useState({ open: false, hidden: false });
  const mapContext = useContext(MapContext);
  const [MyLoc, SetMyLoc] = useState(true);
  const [TextLoca, SetTextLoca] = useState(true);
  const ZoomIn = () => {
    const map = mapContext.map;
    map.zoomIn();
  };
  const ZoomOut = () => {
    mapContext.map.zoomOut();
  };
  const MyLocation = () => {
    const map = mapContext.map;

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    if (map.hasImage("pulsing-dot")) {
      map.removeImage("pulsing-dot");
      map.removeLayer("points1");
      map.removeSource("points1");
    } else {
      function success(pos) {
        var crd = pos.coords;

        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        map.flyTo({
          center: [crd.longitude, crd.latitude],
          zoom: "16"
        });

        var size = 200;

        var pulsingDot = {
          width: size,
          height: size,
          data: new Uint8Array(size * size * 4),

          onAdd: function() {
            var canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext("2d");
          },

          render: function() {
            var duration = 1000;
            var t = (performance.now() % duration) / duration;

            var radius = (size / 2) * 0.3;
            var outerRadius = (size / 2) * 0.7 * t + radius;
            var context = this.context;
            // draw outer circle
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
              this.width / 2,
              this.height / 2,
              outerRadius,
              0,
              Math.PI * 2
            );
            context.fillStyle = "rgba(41, 52, 115," + (1 - t) + ")";
            context.fill();
            // draw inner circle
            context.beginPath();
            context.arc(
              this.width / 2,
              this.height / 2,
              radius,
              0,
              Math.PI * 2
            );
            context.fillStyle = "rgba(41, 52, 115, 45)";
            context.strokeStyle = "white";
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            this.data = context.getImageData(
              0,
              0,
              this.width,
              this.height
            ).data;

            map.triggerRepaint();

            return true;
          }
        };

        map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

        map.addLayer({
          id: "points1",
          type: "symbol",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [crd.longitude, crd.latitude]
                  }
                }
              ]
            }
          },
          layout: {
            "icon-image": "pulsing-dot"
          }
        });
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
    }
    SetMyLoc(!MyLoc);
    SetTextLoca(!TextLoca);
  };

  const { isFullscreen, toggleFullscreen } = useFullscreen(
    window.document.body
  );
  const action = [
    {
      icon: isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />,
      name: isFullscreen ? "Exit Fullscreen" : "Open Fullscreen",
      func: toggleFullscreen
    },
    {
      icon: MyLoc ? <MyLocationIcon /> : <LocationDisabledIcon />,
      name: TextLoca ? "My Location" : "Close Location",
      func: MyLocation
    },
    { icon: <RemoveIcon />, name: "Zoom Out", func: ZoomOut },
    { icon: <AddIcon />, name: "Zoom In", func: ZoomIn }
  ];

  const toolsmap = action.map(action => (
    <SpeedDialAction
      key={action.name}
      icon={action.icon}
      onClick={action.func}
      tooltipTitle={action.name}
    />
  ));

  const handleClick = () => {
    setState(state => ({
      open: !state.open
    }));
  };

  const handleClose = () => {
    setState({ open: false });
  };

  return (
    <div className={classes.toolsPosition}>
      <SpeedDial
        ariaLabel="Tools Map"
        hidden={state.hidden}
        open={state.open}
        icon={<SpeedDialIcon />}
        onClick={handleClick}
        onClose={handleClose}
      >
        {toolsmap}
      </SpeedDial>
    </div>
  );
};

export default MapTools;
