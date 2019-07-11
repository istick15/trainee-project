import React from "react";

import "./App.css";
import LoginPage from "./Page/LoginPage";
import BackendPage from "./Page/BackendPage";
import MapPage from "./Page/MapPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StoreSpace from "./Component/Backend/StoreSpace";
import MapSpace from "./Component/Backend/MapSpace";

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={LoginPage} />
        <Route path="/Backend" component={BackendPage} />
        <Route path="/MapPage" component={MapPage} />
        <Route path="/Backend/store" component={StoreSpace} />
        <Route path="/Backend/mapservices" component={MapSpace} />
      </div>
    </Router>
  );
};

export default App;
