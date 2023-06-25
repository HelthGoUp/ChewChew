import React, { useState } from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";

const RecipeRight = ({title, time, calories, instructions}) => {

  return (
    <Box>
        <Text>{title}</Text>
        <Box display="flex" flexDirection="row">
            <Text>{time}</Text>
            <Text>{calories}</Text>
        </Box>
        <Text>Instructions</Text>

        <Box display="flex" flexDirection="column">
            {instructions.map((instruction, index) => {
                return <Checkbox key={index}>
                    {instruction}
                </Checkbox>
            })}
        </Box>
    </Box>
  );
};

export default RecipeRight;