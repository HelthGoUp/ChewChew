import React, { useState } from "react";
import { Box, Button, Checkbox, Image, Text } from "@chakra-ui/react";
import Food from "./../../images/food-people.svg"

const Animation = () => {

  return (
    <Box 
        display="flex"
        justifyContent="center"
        paddingTop="40px"
    >
        <Image
            src={Food}
            style={{
                animation: 'bounce 1s infinite alternate',
            }}
        />
    </Box>
  );
};

export default Animation;