import React, { useState } from "react";
import { Box, Button, Checkbox, Image, Text } from "@chakra-ui/react";

const RecipeLeft = ({image, ingredients, equipment}) => {

  return (
    <Box paddingTop="100px" paddingBottom="15px">
        <Image src={image}
            style={{
                width: "333px",
                height: "216px",
                objectFit: "contain"
            }}
        />
        <Text className="headingTwo" color="#0c5446">
            Ingredients
        </Text>
        <Box display="flex" flexDirection="column">
            {ingredients.map((ingredient, index) => {
                return <Checkbox key={index} color="#0c5446">
                    {ingredient}
                </Checkbox>
            })}
        </Box>

        <Text className="headingTwo" color="#0c5446" paddingTop="24px">
            Equipment
        </Text>
        <Box display="flex" flexDirection="column">
            {equipment.map((tool, index) => {
                return <Checkbox key={index} color="#0c5446">
                    {tool}
                </Checkbox>
            })}
        </Box>
    </Box>
  );
};

export default RecipeLeft;