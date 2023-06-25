import React, { useContext, useEffect, useState } from "react";
import { Button, Box, Image, Text, Tab, TabList, Tabs } from "@chakra-ui/react";
import Logo from "./../images/Logo-with-wordmark.svg"
import { getUserData } from "../firebase/firebaseFunctions";
import { SignedInContext } from "../helper/Context";

const NavbarPrivate = () => {

    const { value } = useContext(SignedInContext);
    const [imageURL, setImageURL] = useState("");
  
    useEffect(() => {
      const getPfp = async () => {
        const values = await getUserData(value);
        const { photoURL } = values;
        setImageURL(photoURL);
      };
      getPfp();
    }, []);

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
            <Tabs variant="soft-rounded">
                <TabList>
                <Tab className="tabs" position="absolute" left="560px" top="18px">
                    Make Food
                </Tab>
                <Tab className="tabs" position="absolute" left="750px" top="18px">
                    Share Food
                </Tab>
                </TabList>
            </Tabs>
            <Image
                src={
                imageURL !== ""
                    ? imageURL
                    : "https://40.media.tumblr.com/c0647b6bf08ce42043e1ad38953f92bb/tumblr_noorbyuO0p1spf5dlo1_500.jpg"
                }
                alt="logo"
                borderRadius="full"
                boxSize="60px"
                position="absolute"
                left="1150px"
            />
        </Box>
    )
}

export default NavbarPrivate