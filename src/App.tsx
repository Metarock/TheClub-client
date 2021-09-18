import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { CreatePage } from "./pages/create-page";
import { CreatePost } from "./pages/create-post";
import { EditPage } from "./pages/edit/[id]";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { EditPost } from "./pages/editPost/[id]";
import { Register } from "./pages/register";
import { Page } from "./pages/[id]";
import ChangePassword from "./pages/changePassword/[token]";
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
