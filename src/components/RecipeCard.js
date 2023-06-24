import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const RecipeCard = ({image, title, time}) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
        >
            <Image boxSize="150px" src={image}/>
            <Text>{title}</Text>
            <Text>{time}</Text>
        </Box>
    )
}

export default RecipeCard