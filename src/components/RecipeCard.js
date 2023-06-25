import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const RecipeCard = ({image, title, time}) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            marginRight={"10px"}
            marginTop={"10px"}
            width={"220px"}
        >
            <Image boxSize="220px" src={image} borderRadius={"6px"}/>
            <Text className="description minor" overflowWrap={"break-word"} alignItems={"flex-end"}>{time + " mins"}</Text>
            <Text className="description major" overflowWrap={"break-word"}>{title}</Text>
        </Box>
    )
}

export default RecipeCard