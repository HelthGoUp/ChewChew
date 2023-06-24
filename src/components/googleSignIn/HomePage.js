import React, { useContext, useEffect } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import { Box, Button, Text } from "@chakra-ui/react";
import { SignedInContext } from "../../helper/Context";
import LoggedInHomePage from "./LoggedInHomePage";

const HomePage = () => {
  const { value, setValue } = useContext(SignedInContext);

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(data, " is the data");
      console.log(data.user.uid, " is the uid");
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  return (
    <Box>
      {value ? (
        <LoggedInHomePage />
      ) : (
        <Box justifyContent="center" textAlign="center" p="20px">
          <Text>Welcome to wafflehacks2023 project!</Text>
          <Button mt="20px" onClick={handleClick}>
            Sign In With Google
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
