import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const RecipeCard = ({image, title, time}) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            marginRight={"10px"}
            marginTop={"10px"}
        >
            <Image boxSize="220px" src={image} borderRadius={"6px"}/>
            <Text className="description" overflowWrap={"true"}>{title}</Text>
            <Text>{time}</Text>
        </Box>
    )
}

export default RecipeCard