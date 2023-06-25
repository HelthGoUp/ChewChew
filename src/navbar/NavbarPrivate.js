import React, { useContext, useEffect, useState } from "react";
import { Button, Box, Image, Text, Tab, TabList, Tabs } from "@chakra-ui/react";
import Logo from "./../images/Logo-with-wordmark.svg";
import { getUserData } from "../firebase/firebaseFunctions";
import { SignedInContext, TabContext } from "../helper/Context";

const NavbarPrivate = ({ toggle }) => {
  const { value } = useContext(SignedInContext);
  const { tab, setTab } = useContext(TabContext);
  const [imageURL, setImageURL] = useState("");
  const [tabState, setTabState] = useState(tab);

  useEffect(() => {
    setTab(tabState);
  }, [tabState]);

  useEffect(() => {
    const getPfp = async () => {
      const values = await getUserData(value);
      const { photoURL } = values;
      setImageURL(photoURL);
    };
    getPfp();
  }, []);

    const toggleForum = () => {
        setTab(false);
    }
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
            paddingLeft="40px"
            justifyContent="space-between"
        >
            <Image src={Logo} boxSize="150px" alt="logo" position="absolute" left="80px"/>
            <Tabs variant="soft-rounded">
                <TabList>
                <Tab className="tabs" position="absolute" left="42%" top="18px" onClick={toggleFood}>
                    Make Food
                </Tab>
                <Tab className="tabs" position="absolute" left="52%" top="18px" onClick={toggleForum}>
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
                top="10px"
                right="40px"
            />
        </Box>
    )
}

  const toggleForum = () => {
    setTabState(false);
  };
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
      paddingLeft="40px"
      justifyContent="space-between"
    >
      <Image
        src={Logo}
        boxSize="150px"
        alt="logo"
        position="absolute"
        left="80px"
      />
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab
            className="tabs"
            position="absolute"
            left="42%"
            top="18px"
            onClick={toggleFood}
            isSelected={tabState}
          >
            Make Food
          </Tab>
          <Tab
            className="tabs"
            position="absolute"
            left="52%"
            top="18px"
            onClick={toggleForum}
            isSelected={tabState === false}
          >
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
        top="10px"
        right="40px"
      />
    </Box>
  );
};

export default NavbarPrivate;
