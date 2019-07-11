import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { FeatureContextProvider } from "./Component/MyMap/FeatureContext";
import { LayerContextProvider } from "./Context/LayerContext";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F2AD2E"
    },
    secondary: {
      main: "#F27304"
    }
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <LayerContextProvider>
      <FeatureContextProvider>
        <App />
      </FeatureContextProvider>
    </LayerContextProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
