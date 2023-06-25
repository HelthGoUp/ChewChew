import React, { useState } from "react";
import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { m } from "framer-motion";
import RecipeLeft from "./RecipeLeft";
import RecipeRight from "./RecipeRight";

const RecipeInstructions = () => {

    const recipeList = [
        {
            "id": 652591,
            "title": "Mummy Meatballs with Spaghetti",
            "image": "https://spoonacular.com/recipeImages/652591-312x231.jpg",
            "usedIngredientCount": 4,
            "missedIngredientCount": 6,
            "missedIngredients": [
                "1/2 cup soft bread crumbs",
                "1 large egg",
                "2 teaspoons garlic paste",
                "1 teaspoon Italian seasoning",
                "1/4 cup grated Parmesan cheese",
                "pimiento stuffed green olives"
            ],
            "usedIngredients": [
                "1 pound lean ground beef",
                "cooked spaghetti noodles or other cooked pasta",
                "1 quart marinara sauce or spaghetti sauce",
                "cooked wide rice noodles or extra wide egg noodles"
            ],
            "unusedIngredients": [
                "Chicken",
                "plums"
            ],
            "likes": 2,
            "servings": 16,
            "readyInMinutes": 45,
            "vegetarian": false,
            "calories": 33.164375,
            "instructions": [
                "Mix together ingredients for meatballs in a bowl.Preheat oven to 350F.Grease an 8 hole muffin tin.Use an ice cream scoop to divide out meatball mix and drop into muffin pan.",
                "Bake meatballs, for 35 minutes or until inside reaches 160F on an instant read thermometer.",
                "Drain meatballs on a cookie rack.",
                "Heat marinara sauce and cook spaghetti and rice noodles (separately) according to package directions.",
                "Drain pasta, keep spaghetti warm and cool rice noodles in cold water then drain.Slice meatballs in half horizontally to make two pieces, each with a flat surface.Pat rice noodles dry with paper toweling and layer over the top of the meatball, tucking sliced olives in for eyes.It is best to let the meatballs sit still for about 15 minutes so they become more tacky and hold together better.But since they will get cold, microwave them on a microwave-safe plate for a minute, then carefully place a mummy meatball onto a nest of sauced spaghetti and serve."
            ],
            "equipment": [
                "ice cream scoop",
                "kitchen thermometer",
                "muffin tray",
                "microwave",
                "oven",
                "bowl"
            ]
        }
    ]


  return (
    <Box
        display="grid"
        gridTemplateColumns="repeat(10, 1fr)"
    >
        <HStack>
            <VStack w="333px" paddingLeft="48px" marginRight={"20px"}>
                <Box>
                     <RecipeLeft
                        image={recipeList[0].image}
                        missedIngredients={recipeList[0].missedIngredients}
                        usedIngredients={recipeList[0].usedIngredients}
                        equipment={recipeList[0].equipment}
                        key={1}
                    />
                </Box>
            </VStack>

            <VStack w="675px" paddingTop="19px" alignItems="baseline" alignSelf="baseline">
                <Box>
                        <RecipeRight
                            title={recipeList[0].title}
                            time={recipeList[0].readyInMinutes}
                            calories={recipeList[0].calories}
                            instructions={recipeList[0].instructions}
                            likes={recipeList[0].likes}
                            servings = {recipeList[0].servings}
                            key={2}
                        />
                </Box>
            </VStack>
        </HStack>
        
    </Box>
  );
};

export default RecipeInstructions;