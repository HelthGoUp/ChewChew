import React, { useState } from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { m } from "framer-motion";
import RecipeLeft from "./RecipeLeft";
import RecipeRight from "./RecipeRight";

const RecipeInstructions = () => {

    const recipeList = [
        {
            title: "Beef Bolognese",
            time: "45 min",
            calories: "560 cal",
            image: "https://media.blueapron.com/recipes/2527/square_newsletter_images/1506122712-1-0002-4623/1002_2PRE08_Beef-Bolognese_89134_WEB_SQ.jpg?quality=80&width=850&format=pjpg",
            ingredients: [
                "1 pound (450 g) ground beef",
                "2 tablespoons olive oil",
                "1 medium onion, finely chopped",
                "2 cloves garlic, minced",
                "2 stalks celery, finely chopped",
                "1 can (6 ounces) tomato paste",
                "1 teaspoon dried basil",
                "Salt and pepper to taste",
                "8 ounces pasta (spaghetti or any other type)"
            ],
            equipment: [
                "Large skillet or pot",
                "Chopping board and knife"
            ],
            instructions: [
                "Heat the olive oil in a large skillet or pot over medium heat",
                "Add chopped onion",
                "Stir in the tomato paste",
                "Add the diced tomatoes",
                "Reduce the heat to low and simmer",
                "Meanwhile, cook the pasta according"
            ]
        }
    ]


  return (
    <Box
        display="grid"
        gridTemplateColumns="repeat(10, 1fr)"
    >
        <Box
            style={{ gridColumn: '1/4'}}
        >
            {recipeList.map((recipe, index) => {
                return <RecipeLeft
                    image={recipe.image}
                    ingredients={recipe.ingredients}
                    equipment={recipe.equipment}
                    key={index}
                />
            })}
        </Box>

        <Box
            style={{ gridColumn: '4/11'}}
        >
            {recipeList.map((recipe, index) => {
                return <RecipeRight
                    title={recipe.title}
                    time={recipe.time}
                    calories={recipe.calories}
                    instructions={recipe.instructions}
                    key={index}
                />
            })}
        </Box>
        
    </Box>
  );
};

export default RecipeInstructions;