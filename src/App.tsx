import { ApolloProvider } from "@apollo/client";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { CreatePage } from "./pages/create-page";
import { EditPage } from "./pages/edit/[id]";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import Page from "./pages/[id]";
import client from "./utils/withApollo";

export const App = () => (
  <>
    <ApolloProvider client={client}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/create-page" component={CreatePage} />
        <Route exact path="/page/:id" component={Page} />
        <Route exact path="/page/edit/:id" component={EditPage} />
      </Switch>
      <Footer />
    </ApolloProvider>
  </>
)
