import React from "react";
import { Box, Button, Image, Tab, TabList, Tabs } from '@chakra-ui/react';

const Header = () => {
    return (
        <Box
            w="100%"
            h="80px"
            pos="fixed"
            top="0"
            bg="#d8d0bd"
            display="flex"            
            flexDirection="row"
            alignItems="center"
        >
            <Image
                src="https://40.media.tumblr.com/c0647b6bf08ce42043e1ad38953f92bb/tumblr_noorbyuO0p1spf5dlo1_500.jpg"
                alt="logo"
                borderRadius="full"
                boxSize="60px"
                position="absolute"
                left="120px"
            />
            <Tabs variant='soft-rounded'>
                <TabList>
                    <Tab className="tabs" position="absolute" left="560px" top="18px">Make Food</Tab>
                    <Tab className="tabs" position="absolute" left="750px" top="18px">Share Food</Tab>
                </TabList>
            </Tabs>
            <Image
                alt="user"
                position="absolute"
                left="1220px"
            />
        </Box>
    )
}

export default Header;