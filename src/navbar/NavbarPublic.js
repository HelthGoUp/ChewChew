import React, { useContext, useEffect, useState } from "react";
import { SignedInContext } from "../helper/Context";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";

import { Box, Button, Image, Tab, TabList, Tabs } from "@chakra-ui/react";
import Logo from "./../images/Logo-with-wordmark.svg"
import { addUser } from "../firebase/firebaseFunctions";

const NavbarPublic = () => {
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
    <Box
      w="1280px"
      h="80px"
      pos="fixed"
      top="0"
      bg="#d8d0bd"
      display="flex"
      flexDirection="row"
      alignItems="center"
      paddingLeft="40px"
      justifyContent="space-between"
    >
        <Image src={Logo} boxSize="150px" alt="logo" position="absolute" left="120px"/>
        <Box display="flex" flexDirection="row" paddingRight="40px">
            {/* <Button w="85px" colorScheme="#0c5446" variant="outline" position="absolute" left="920px" top="24px">Log In</Button> */}
            <Button w="160px" bg="#ff6700" position="absolute" left="1020px" top="24px" color="white" onClick={handleClick}>Log In</Button>
        </Box>
    </Box>
  );
};

export default NavbarPublic;