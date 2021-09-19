import * as React from "react";
import { Switch } from "react-router-dom";
import { Navbar, Footer } from "./components/exportComponents";
import { Routes } from "./utils/Routes";

export const App = () => (
  <>
    <Navbar />
    <Switch>
      <Routes />
    </Switch>
    <Footer />
  </>
)
