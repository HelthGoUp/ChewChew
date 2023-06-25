import { HStack, Img, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUserData } from "../../firebase/firebaseFunctions";

const ForumPost = ({ data }) => {
  let { location = "", picture, tag, text, time, uid } = data;

  const [userName, setUserName] = useState("");
  const [pfp, setPfp] = useState("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      let userData = await getUserData(uid);
      setPfp(userData.photoURL);
      setUserName(userData.name);
    };
    getDetails();
  }, []);

  return (
    <VStack
      height="355px"
      p="7px"
      w="fit-content"
      backgroundColor={hover?"#F4F6F9":""}
      borderRadius={"9px"}
      align="flex-start"
      spacing="5px"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Img
        backgroundColor="white"
        // boxSize={200}
        height="250px"
        width="250px"
        objectFit="cover"
        src={picture}
        borderRadius="9px"
      />
      <VStack
        w="100%"
        spacing={location !== "" ? "2px" : "5px"}
        align="flex-start"
      >
        <HStack w="100%" justify="space-between" spacing={4}>
          <HStack>
            <Img boxSize="27px" borderRadius="50%" src={pfp} alt="pfp" />
            <Text fontSize="14px" fontWeight="bold">
              {userName}
            </Text>
          </HStack>
          <Text maxW="200px" overflowWrap="break-word" fontSize="13px">
            {time}
          </Text>
        </HStack>
        {location !== "" && (
          <Text fontSize="12px" fontWeight="light">
            {location}
          </Text>
        )}
        <Text
          lineHeight="1.1"
          fontSize="13px"
          maxW="200px"
          overflowWrap="break-word"
          textAlign="left"
        >
          {text}
        </Text>
      </VStack>
    </VStack>
  );
};

export default ForumPost;
