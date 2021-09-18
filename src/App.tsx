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

export const App = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/change-password/:token" component={ChangePassword} />
      <Route exact path="/create-page" component={CreatePage} />
      <Route exact path="/create-post" component={CreatePost} />
      <Route exact path="/pages/:id" component={Page} />
      <Route exact path="/pages/edit/:id" component={EditPage} />
      <Route exact path="/pages/editPost/:id" component={EditPost} />
    </Switch>
    <Footer />
  </>
)
