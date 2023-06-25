import React, { useContext, useEffect, useState } from "react";
import { auth, provider } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { SignedInContext } from "../../helper/Context";
import LoggedInHomePage from "./LoggedInHomePage";
import { addUser } from "../../firebase/firebaseFunctions";
import NavbarPublic from "../../navbar/NavbarPublic";
import NotLoggedInHomePage from "../NotLoggedInHomePage";

const HomePage = () => {
  const { value, setValue } = useContext(SignedInContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const handleClick = async () => {
    signInWithPopup(auth, provider).then(({ user }) => {
      console.log(user, " is the user");
      const { uid, email, displayName, photoURL } = user;
      setValue(uid);
      setName(displayName);
      setEmail(email);
      setPhotoURL(photoURL);

      localStorage.setItem("uid", user.uid);
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("uid"));
    if (name && email && value && photoURL) {
      const addNewUser = async () => {
        try {
          addUser(value, name, email, photoURL);
        } catch (error) {
          console.log("error has occurred when adding: ", error);
        }
      };
      addNewUser();
      console.log("user has been added!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, value, photoURL]);

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
