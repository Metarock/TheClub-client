import { AnimatePresence } from "framer-motion";
import * as React from "react";
import { Footer, Navbar } from "./components/exportComponents";
import { Routes } from "./utils/Routes";

export const App = () => (
  <>
    <AnimatePresence>
      <Navbar />
      <Routes />
      <Footer />
    </AnimatePresence>
  </>
)
