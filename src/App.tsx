import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { CreatePage } from "./pages/create-page";
import { EditPage } from "./pages/edit/[id]";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import Page from "./pages/[id]";
import { Routes } from "./Routes";
import { setAccessToken } from "./utils/accessToken";
interface AppProps {

}
export const App: React.FC<AppProps> = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('http://localhost:4000/refresh_token',
      {
        method: "POST",
        credentials: "include"
      }).then(async (x) => {
        const { accessToken } = await x.json();
        setAccessToken(accessToken) // to refresh
        console.log(accessToken);
        setLoading(false);
      })
  }, [])

  if (loading) {
    return <div>loading....</div>
  }

  return (<Routes />);
}