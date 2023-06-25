import React, { useState } from "react";
import { Box, Button, Checkbox, Image, Text, border } from "@chakra-ui/react";

const RecipeLeft = ({image, missedIngredients, usedIngredients, equipment}) => {

  return (
    <Box paddingTop="20px" paddingBottom="15px">
        <Image src={image}
            style={{
                width: "333px",
                height: "216px",
                borderRadius: "10px"
            }}
        />
        <Text className="headingTwo" color="#0c5446">
            Ingredients
        </Text>
        <Box display="flex" flexDirection="column">
            {usedIngredients.map((ingredient, index) => {
                return <Checkbox key={index} color="#0c5446" isChecked={true}>
                    {ingredient}
                </Checkbox>
            })}
            {missedIngredients.map((ingredient, index) => {
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