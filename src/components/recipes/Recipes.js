import React, { useState } from "react";
import { Box, Button, Text, Input, Tag, TagLabel, TagCloseButton, HStack, VStack, Wrap, WrapItem} from "@chakra-ui/react";
import RecipeCard from "../RecipeCard";
import NavbarPrivate from "../../navbar/NavbarPrivate";

const Recipes = () => {

    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState(null);
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleTagCreate = () => {
        const newTag = { id: tags.length + 1, name: inputValue };
        if(newTag.name === '') return;
        setTags([...tags, newTag]);
        setInputValue('');
    };

    const handleTagRemove = (tagId) => {
        const updatedTags = tags.filter((tag) => tag.id !== tagId);
        setTags(updatedTags);
    };

    
    const handleGetRecipes = () => {
        console.log("here")
        fetch("http://localhost:9000/api/recipes",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ingredients: tags.map((tag) => tag.name)})
        }).then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error));
        console.log(data)
        
    }
      const recipeCardList = [
    {
      image: "https://cravingsjournal.com/wp-content/uploads/2019/08/Bolognese-sauce-1.jpg",
      title: "Minestrone Noodle Soup",
      time: "40 min"
    },
    {
      image: "https://littlespoonfarm.com/wp-content/uploads/2021/09/Instant-Pot-Beef-Stew-Recipe.jpg",
      title: "Beef Stew",
      time: "30 min"
    },{
        image: "https://cravingsjournal.com/wp-content/uploads/2019/08/Bolognese-sauce-1.jpg",
        title: "Minestrone Noodle Soup",
        time: "40 min"
      },
      {
        image: "https://littlespoonfarm.com/wp-content/uploads/2021/09/Instant-Pot-Beef-Stew-Recipe.jpg",
        title: "Beef Stew",
        time: "30 min"
      },{
        image: "https://cravingsjournal.com/wp-content/uploads/2019/08/Bolognese-sauce-1.jpg",
        title: "Minestrone Noodle Soup",
        time: "40 min"
      },
      {
        image: "https://littlespoonfarm.com/wp-content/uploads/2021/09/Instant-Pot-Beef-Stew-Recipe.jpg",
        title: "Beef Stew",
        time: "30 min"
      },{
        image: "https://cravingsjournal.com/wp-content/uploads/2019/08/Bolognese-sauce-1.jpg",
        title: "Minestrone Noodle Soup",
        time: "40 min"
      },
      {
        image: "https://littlespoonfarm.com/wp-content/uploads/2021/09/Instant-Pot-Beef-Stew-Recipe.jpg",
        title: "Beef Stew",
        time: "30 min"
      },{
        image: "https://cravingsjournal.com/wp-content/uploads/2019/08/Bolognese-sauce-1.jpg",
        title: "Minestrone Noodle Soup",
        time: "40 min"
      },
      {
        image: "https://littlespoonfarm.com/wp-content/uploads/2021/09/Instant-Pot-Beef-Stew-Recipe.jpg",
        title: "Beef Stew",
        time: "30 min"
      },{
        image: "https://cravingsjournal.com/wp-content/uploads/2019/08/Bolognese-sauce-1.jpg",
        title: "Minestrone Noodle Soup",
        time: "40 min"
      },
      {
        image: "https://littlespoonfarm.com/wp-content/uploads/2021/09/Instant-Pot-Beef-Stew-Recipe.jpg",
        title: "Beef Stew",
        time: "30 min"
      }
  ]
  return (
    <Box>
        <NavbarPrivate/>
        { data===null ? (
            <Box w="40%" alignContent={"left"}>
                <VStack alignItems="left">
                <Text className="title">Let's make a meal plan!</Text>
                <Text className="subheading">What kind of ingredients do you have?</Text>
                <Box display="flex" flexDirection="row">
                    <HStack>
                        <Input
                            type="text"
                            placeholder="What are you cooking with?"
                            bg="white"
                            w="600px"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    handleTagCreate();
                                }
                            }}
                        />
                        <Button onClick={handleTagCreate}>Add Ingredient</Button>
                    </HStack>
                </Box>
            
                <Box display="flex" flexDirection="row">
                    {tags.map((tag) => (
                        <Tag key={tag.id} marginRight={"4px"}>
                            <TagLabel>{tag.name}</TagLabel>
                            <TagCloseButton onClick={() => handleTagRemove(tag.id)}/>
                        </Tag>
                    ))}
                </Box>
                <Box paddingTop="40px" display="flex">
                    <Button bg="#dd6b20" color="white"onClick={handleGetRecipes}>Let's get cooking!</Button>
                </Box>
                </VStack>
                </Box>

                ):(
                    <Box margin={"2em"} display={"flex"} flexDirection={"column"} >
                    <VStack alignItems="left" verticalAlign={""}>
                    <Text className="title">Suggested Recipes</Text>
                    <Text className="subheading">Based on your available ingredients, you can make...</Text>
                    <Wrap>
                        {data!==null?(
                        recipeCardList.map((recipe, index) => {
                        return (<WrapItem><RecipeCard 
                                image={recipe.image}
                                title={recipe.title}
                                time={recipe.time}
                                key={index}/>
                                </WrapItem>)
                    })):null
                    }
                    </Wrap>
                    </VStack>
                    </Box>

                )
        }
    </Box>
    );
};

export default Recipes;
