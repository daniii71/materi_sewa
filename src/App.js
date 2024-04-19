import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./views/Login";
import Register from "./views/Register";
import Sidebar from "./controllers/Sidebar";
import Dashbord from "./page/Dashbord";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />

          {/* tambah */}

          {/* edit */}
          <Route path="/Sidebar" component={Sidebar} />
          <Route component={Dashbord} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
