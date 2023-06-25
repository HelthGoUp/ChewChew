import React, { useState } from "react";
import { Box, Button, Text, Input, Tag, TagLabel, TagCloseButton, HStack, VStack, Wrap, WrapItem, Center, Flex, Image,Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, ModalHeader, ModalCloseButton, useDisclosure} from "@chakra-ui/react";
import RecipeCard from "../RecipeCard";
import NavbarPrivate from "../../navbar/NavbarPrivate";
import { wait } from "@testing-library/user-event/dist/utils";
import RecipeInstructions from "./RecipeInstructions";
import { m } from "framer-motion";
import RecipeLeft from "./RecipeLeft";
import RecipeRight from "./RecipeRight";
import Animation from "./Animation";

const Recipes = () => {

    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState(null);
    const [recipe, setRecipe] = useState(null);
    const [transition, setTransition] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    //Handling
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
        setTransition(true);
        wait(2000).then(() => {;
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
            .then(json => setData(json)).finally(() => setTransition(false))
            .catch(error => console.error(error));
            console.log(data)
        });
        
        
    }

    //Transition page
    function Transition() {
    
      return (
        <div className={transition?"overlay":"overlay hide"}>
            <div className="container">
                <div className="loader">
                <Image minHeight="200px" minWidth={"700px"} src={`/images/TrainV2.svg`} borderRadius={"10px"}/>
                </div>
            </div>
            <Flex alignContent={"center"} justifyContent={"center"}>
                <Center>
                    <Text className="heading center">Cooking up some Recipes...</Text>
                </Center>
            </Flex>
        </div>
        );
    }

    //Recipe Modal Page
    function RecipeModal() {
        return (
            <>            
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minWidth={"60%"} >
              <ModalBody>
              <Button variant='ghost' onClick={onClose}>← Back to Suggested Recipes</Button>
                 <RecipeInstructions />
                 <Animation />
              </ModalBody>
              <ModalFooter>
                <Center>
                </Center>
              </ModalFooter>
            </ModalContent>
          </Modal>
          </>

        );
    }

    //Recipe Card Page
    const onRecipeClick = (id) => {
        setRecipe(id);
        onOpen();
    }
  

    const RecipeCard = ({image, title, time, calories,likes,id}) => {

        return (
            <Box
                display="flex"
                flexDirection="column"
                marginRight={"10px"}
                marginTop={"10px"}
                width={"220px"}
                onClick={() => onRecipeClick(id)}
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

    //Recipe Page
    function RecipeInstructions () {

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
    
        let modalRecipe = recipeList[0];
        console.log(data)
        for(let i = 0; i < data.recipes.length; i++) {
            console.log('found')
            if(data.recipes[i].id === recipe) {
                modalRecipe = data.recipes[i];
                break;
            }
        }
        return (
            <Box
                display="grid"
                gridTemplateColumns="repeat(10, 1fr)"
            >
                <HStack>
                    <VStack w="333px" paddingLeft="48px" marginRight={"20px"}>
                        <Box>
                            <RecipeLeft
                                image={modalRecipe.image}
                                missedIngredients={modalRecipe.missedIngredients}
                                usedIngredients={modalRecipe.usedIngredients}
                                equipment={modalRecipe.equipment}
                                key={1}
                            />
                        </Box>
                    </VStack>
        
                    <VStack w="675px" paddingTop="19px" alignItems="baseline" alignSelf="baseline">
                        <Box>
                                <RecipeRight
                                    title={modalRecipe.title}
                                    time={modalRecipe.readyInMinutes}
                                    calories={modalRecipe.calories}
                                    instructions={modalRecipe.instructions}
                                    likes={modalRecipe.likes}
                                    servings = {modalRecipe.servings}
                                    key={2}
                                />
                        </Box>
                    </VStack>
                </HStack>
                
            </Box>
        );
    };
    
  return (
    <Box>
        <RecipeModal/>
        <Transition/>
        <NavbarPrivate/>
        { data===null ? (
                <VStack alignItems={"flex-start"} margin={"12%"} marginBottom={"30%"}>
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
            
                <Box display="flex" flexDirection="row" maxWidth={"700px"}>
                    <Wrap>
                    {tags.map((tag,index) => (
                        <WrapItem>
                        <Tag key={index} marginRight={"3px"}>
                            <TagLabel>{tag.name}</TagLabel>
                            <TagCloseButton onClick={() => handleTagRemove(tag.id)}/>
                        </Tag>
                        </WrapItem>
                    ))}
                    </Wrap>
                </Box>
                <Box paddingTop="40px" display="flex">
                    <Button bg="#dd6b20" color="white"onClick={handleGetRecipes}>Let's get cooking!</Button>
                </Box>
                </VStack>
                ):(
                    <Box margin={"8%"} display={"flex"} flexDirection={"column"}marginTop={"12%"}>
                    <VStack alignItems="flex-start">
                    <Text className="title">Suggested Recipes</Text>
                    <Text className="subheading">Based on your available ingredients, you can make...</Text>
                    <Wrap alignItems={"center"}>
                        {data!==null?(
                        data.recipes.map((recipe, index) => {
                        return (<WrapItem><RecipeCard 
                                image={recipe.image}
                                title={recipe.title}
                                time={recipe.readyInMinutes}
                                key={recipe.id}
                                calories={recipe.calories}
                                likes={recipe.likes}
                                id={recipe.id}
                                open={onOpen}
                                />
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
