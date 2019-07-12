import React from "react";

import "./App.css";
import LoginPage from "./Page/LoginPage";
import BackendPage from "./Page/BackendPage";
import MapPage from "./Page/MapPage";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import StoreSpace from "./Component/Backend/StoreSpace";
import MapSpace from "./Component/Backend/MapSpace";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("user_token") ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};
const App = () => {
  return (
    <Router>
      {/* <Route
        render={({ location }) => (
          <React.Fragment>
            <Switch location={location}>
              <Route exact path="/" Component={LoginPage} />
              <Route path="/Backend" component={BackendPage} />
            </Switch>
          </React.Fragment>
        )}
      /> */}

      <Route exact path="/" component={LoginPage} />
      <PrivateRoute path="/Backend" component={BackendPage} />

      <Route path="/MapPage" component={MapPage} />
      <Route path="/Backend/store" component={StoreSpace} />
      <Route path="/Backend/mapservices" component={MapSpace} />
    </Router>
  );
};

export default App;
