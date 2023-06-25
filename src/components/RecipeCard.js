import React from "react";
import { Box, HStack, Image, Text } from "@chakra-ui/react";

const RecipeCard = ({image, title, time, calories,likes}) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            marginRight={"10px"}
            marginTop={"10px"}
            width={"220px"}
        >
            <Image boxSize="220px" src={image} borderRadius={"10px"}/>
            <HStack spacing={"0.7em"}>
                <Text className="description minor" overflowWrap={"break-word"} alignItems={"flex-end"}>{time + " mins"}</Text>
                <Text className="description minor" overflowWrap={"break-word"} textAlign={"end"}>{Math.round(calories) + " Cals"}</Text>
                <Text className="description minor" overflowWrap={"break-word"} textAlign={"end"}>{"♥️ "+ likes}</Text>
            </HStack>
            <Text className="description major" overflowWrap={"break-word"}>{title}</Text>
        </Box>
    )
}

export default RecipeCard