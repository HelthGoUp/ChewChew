import logo from "./logo.svg";
import "./App.css";
import { Box } from "@chakra-ui/react";
import { SignedInContext } from "./helper/Context";
import { useState } from "react";
import HomePage from "./components/googleSignIn/HomePage";

function App() {
  const [value, setValue] = useState("");

  return (
    <SignedInContext.Provider value={{ value, setValue }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        backgroundColor="#fee3b8"
        flexDirection="column"
      >
        <HomePage />
      </Box>
    </SignedInContext.Provider>
  );
}

export default App;
