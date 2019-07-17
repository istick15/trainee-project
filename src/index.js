import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { FeatureContextProvider } from "./Component/MyMap/FeatureContext";
import { LayerContextProvider } from "./Context/LayerContext";
import { FeatureDataContextProvider } from "./Context/FeatureDataContext";

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
        <FeatureDataContextProvider>
          <App />
        </FeatureDataContextProvider>
      </FeatureContextProvider>
    </LayerContextProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
