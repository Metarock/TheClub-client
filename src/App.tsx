import * as React from "react"
import { Navbar } from "./components/Navbar"
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./utils/withApollo";

export const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  </ApolloProvider>
)
