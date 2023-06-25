import React, { useState } from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";

const RecipeRight = ({title, time, calories, instructions, likes, servings}) => {

    

  return (
    <Box>
        <Text className="heading" color="#0c5446" marginTop={"10px"}>
            {title}
        </Text>
        <Box display="flex" flexDirection="column" marginTop={"10px"}>
            <Text color="#0c5446" fontSize="14px" lineHeight="20px" fontWeight="600" paddingRight="16px">
                {time + " mins"}
            </Text>
            <Text color="#0c5446" fontSize="14px" lineHeight="20px" fontWeight="600">
                {Math.round(calories) + " Cals per serving"}
            </Text>
            <Text color="#0c5446" fontSize="12px" lineHeight="20px" fontWeight="600">
                {"Feeds "+ servings}
            </Text>
            <Text color="#0c5446" fontSize="12px" lineHeight="20px" fontWeight="600">
                {"♥️ "+ likes}
            </Text>
        </Box>
        <Text className="headingTwo" maxWidth={"200px"} color="#0c5446" paddingTop="46px" marginLeft={"20px"} overflowWrap={"break-word"}>
            Instructions
        </Text>

        <Box display="flex" flexDirection="column"marginLeft={"20px"}>
            {instructions.map((instruction, index) => {
                return <Text key={index} color="#0c5446"  maxWidth={"600px"} overflowWrap={"break-word"}>
                    {index+1 + ". " + instruction}
                </Text>
            })}
        </Box>
    </Box>
  );
};

export default RecipeRight;