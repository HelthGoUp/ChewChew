import React from "react";
import { Button, Box, Image, Text } from "@chakra-ui/react";
import NavbarPublic from "../navbar/NavbarPublic";
import Train from "./../images/Train.svg"

const NotLoggedInHomePage = () => {

    return (
        <Box w="100%" h="832px">
            <NavbarPublic/>
            <Text className="heading" w="687px" position="absolute" left="120px" top="192px">Free food from your fridge and your friends :)</Text>
            <Text className="description" position="absolute" w="415px" left="120px" top="330px">
                Find recipes for ingredients you already have.
                Share your cooking with your community.
                Find free food around your campus.
            </Text>
            <Button position="absolute" left="120px" top="440px" bg="#ff6700" color="white"
                _hover={{
                    backgroundColor: "#bf4d00"
                }}>Let's get cooking!</Button>
            <Image position="absolute" right="0px" top="512px" src={Train}/>

        </Box>
    )
}

export default NotLoggedInHomePage