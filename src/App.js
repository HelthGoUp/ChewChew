import logo from "./logo.svg";
import "./App.css";
import { Box } from "@chakra-ui/react";
import { SignedInContext, TabContext } from "./helper/Context";
import { useState } from "react";
import HomePage from "./components/googleSignIn/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recipes from "./components/recipes/Recipes";
import LoggedInHomePage from "./components/googleSignIn/LoggedInHomePage";
function App() {
  const [value, setValue] = useState("");
  const [tab, setTab] = useState(true);

  return (
    <SignedInContext.Provider value={{ value, setValue }}>
      <TabContext.Provider value={{ tab, setTab }}>
        <Box
          position="fixed"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
          top="0px"
          left="0px"
          backgroundColor="#FFFEF8"
          flexDirection="column"
        >
          <HomePage />
        </Box>
      </TabContext.Provider>
    </SignedInContext.Provider>
  );
}

export default App;
