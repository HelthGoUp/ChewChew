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
      {!value && <NavbarPublic/>}
      {value ? (
        <LoggedInHomePage />
      ) : (
        <NotLoggedInHomePage />
        // <Box justifyContent="center" textAlign="center" p="20px">
        //   <Text>Welcome to wafflehacks2023 project!</Text>
        //   <Button mt="20px" onClick={handleClick}>
        //     Sign In With Google
        //   </Button>
        // </Box>
      )}
    </Box>
  );
};

export default HomePage;
