import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { SignedInContext } from "../../helper/Context";
import LoggedInHomePage from "./LoggedInHomePage";
import NavbarPublic from "../../navbar/NavbarPublic";
import NotLoggedInHomePage from "../NotLoggedInHomePage";

const HomePage = () => {
  const { value } = useContext(SignedInContext);

  return (
    <Box w="100%">
      <NavbarPublic />
      {value ? <LoggedInHomePage /> : <NotLoggedInHomePage />}
    </Box>
  );
};

export default HomePage;
