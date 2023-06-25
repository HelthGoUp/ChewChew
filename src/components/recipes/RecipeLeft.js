import React, { useState } from "react";
import { Box, Button, Checkbox, Image, Text } from "@chakra-ui/react";

const RecipeLeft = ({image, ingredients, equipment}) => {

  return (
    <Box>
        <Image src={image}
            style={{
                width: "333px",
                height: "216px",
                objectFit: "contain"
            }}
        />
        <Text>Ingredients</Text>
        <Box display="flex" flexDirection="column">
            {ingredients.map((ingredient, index) => {
                return <Checkbox key={index}>
                    {ingredient}
                </Checkbox>
            })}
        </Box>

        <Text>Equipment</Text>
        <Box display="flex" flexDirection="column">
            {equipment.map((tool, index) => {
                return <Checkbox key={index}>
                    {tool}
                </Checkbox>
            })}
        </Box>
    </Box>
  );
};

export default RecipeLeft;