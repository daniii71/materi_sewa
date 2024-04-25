import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./views/Login";
import Register from "./views/Register";
import Sidebar from "./controllers/Sidebar";
import Dashbord from "./page/Dashbord";
import AddRuang from "./sewaruang/AddRuang";
import Ruang from "./sewaruang/TableRuang";
import Pelanggan from "./sewaruang/TablePelanggan";
import AddPelanggan from "./sewaruang/AddPelanggan";
import TampilanAwal from "./sewaruang/TampilanAwal";
import Kamar from "./sewaruang/TableKamar";
import AddKamar from "./sewaruang/AddKamar";
import UpdatePelanggan from "./sewaruang/UpdatePelanggan";
import UpdateKamar from "./sewaruang/UpdateKamar";
import UpdateRuang from "./sewaruang/UpdateRuang";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/tampilan" component={TampilanAwal} />
          <Route path="/data-ruang" component={Ruang} />
          <Route path="/data-pelanggan" component={Pelanggan} />
          <Route path="/data-kamar" component={Kamar} />
          {/* tambah */}
          <Route path="/tambah-ruang" component={AddRuang} />
          <Route path="/tambah-pelanggan" component={AddPelanggan} />
          <Route path="/tambah-kamar" component={AddKamar} />
          {/* edit */}
          <Route path="/edit-pelanggan/:id" component={UpdatePelanggan} />
          <Route path="/edit-kamar/:id" component={UpdateKamar} />
          <Route path="/edit-ruang/:id" component={UpdateRuang} />
          <Route path="/Sidebar" component={Sidebar} />
          <Route component={Dashbord} path="/Dashboard" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
