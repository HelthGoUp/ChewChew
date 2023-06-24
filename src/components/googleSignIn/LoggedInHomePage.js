import React, { useContext, useEffect } from "react";
import { SignedInContext } from "../../helper/Context";
import { Box, Button } from "@chakra-ui/react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { addPost } from "../../firebase/firebaseFunctions";
import Header from "../header/Header";

const LoggedInHomePage = () => {
  const { value, setValue } = useContext(SignedInContext);

  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  const handleClick = async () => {
    addPost(value, "STEAK");
  };

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
      <Header />
      <Box>
        <Button mt="20px" onClick={getUsers}>
          Read the data!
        </Button>
        <Button onClick={handleClick}>handle click</Button>
        {/* <Button onClick={addUser}>ADD ALEX</Button> */}
        <Button onClick={logout}>Log Out</Button>
      </Box>
    </Box>
  );
};

export default LoggedInHomePage;
