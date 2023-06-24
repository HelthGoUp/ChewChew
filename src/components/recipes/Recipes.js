import React, { useState } from "react";
import { Box, Button, Text, Input, Tag, TagLabel, TagCloseButton, HStack } from "@chakra-ui/react";

const Recipes = () => {

    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleTagCreate = () => {
        const newTag = { id: tags.length + 1, name: inputValue };
        setTags([...tags, newTag]);
        setInputValue('');
    };

    const handleTagRemove = (tagId) => {
        const updatedTags = tags.filter((tag) => tag.id !== tagId);
        setTags(updatedTags);
    };

  return (
    <Box w="50%">
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
                <Tag key={tag.id}>
                    <TagLabel>{tag.name}</TagLabel>
                    <TagCloseButton onClick={() => handleTagRemove(tag.id)}/>
                </Tag>
            ))}
        </Box>
        <Box paddingTop="40px" display="flex" justifyContent="center">
            <Button w="65%" bg="#dd6b20" color="white">Let's get cooking!</Button>
        </Box>

    </Box>
  );
};

export default Recipes;



