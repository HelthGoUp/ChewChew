import React, { useContext, useEffect } from "react";
import { SignedInContext } from "../../helper/Context";
import { Box, Button } from "@chakra-ui/react";

const LoggedInHomePage = () => {
  const { value, setValue } = useContext(SignedInContext);

  const logout = () => {
    console.log("logged out");
    localStorage.clear();
    window.location.reload();
  };

  // useEffect(() => {
  //   console.log("inside home page");
  //   console.log(value, " is the value WITHIN");
  // }, []);

  return (
    <Box>
      <Button onClick={logout}>Log Out</Button>
    </Box>
  );
};

export default LoggedInHomePage;
