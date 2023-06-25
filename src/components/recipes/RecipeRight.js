import React, { useState } from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";

const RecipeRight = ({title, time, calories, instructions}) => {

    

  return (
    <Box>
        <Text className="heading" color="#0c5446">
            {title}
        </Text>
        <Box display="flex" flexDirection="row">
            <Text color="#0c5446" fontSize="18px" lineHeight="28px" fontWeight="600" paddingRight="16px">
                {time}
            </Text>
            <Text color="#0c5446" fontSize="18px" lineHeight="28px" fontWeight="600">
                {calories}
            </Text>
        </Box>
        <Text className="headingTwo" color="#0c5446" paddingTop="146px">
            Instructions
        </Text>

        <Box display="flex" flexDirection="column">
            {instructions.map((instruction, index) => {
                return <Text key={index} color="#0c5446">
                    - {instruction}
                </Text>
            })}
        </Box>
    </Box>
  );
};

export default RecipeRight;