import * as React from "react";
import { Switch } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
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
