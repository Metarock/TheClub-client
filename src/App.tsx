import * as React from "react"
import { Navbar } from "./components/Navbar"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./utils/withApollo";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Register } from "./pages/register";

export const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
)
