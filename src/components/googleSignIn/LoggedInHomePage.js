import React, { useContext, useEffect } from "react";
import { SignedInContext } from "../../helper/Context";
import { Box, Button } from "@chakra-ui/react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { addPost } from "../../firebase/firebaseFunctions";
import Header from "../header/Header";
import RecipeCard from "../RecipeCard";

const LoggedInHomePage = () => {
  const { value, setValue } = useContext(SignedInContext);

  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  const handleClick = async () => {
    addPost(value, "STEAK");
  };

  const logout = () => {
    console.log("logged out");
    localStorage.clear();
    window.location.reload();
  };

  //example data
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
    }
  ]

  // useEffect(() => {
  //   console.log("inside home page");
  //   console.log(value, " is the value WITHIN");
  // }, []);

  return (
    <Box>
      <Header />

      {recipeCardList.map((recipe, index) => {
        return <RecipeCard 
        image={recipe.image}
        title={recipe.title}
        time={recipe.time}
        key={index}/>
      })}

      <Box>
        <Button mt="20px" onClick={getUsers}>
          Read the data!
        </Button>
        <Button onClick={handleClick}>handle click</Button>
        {/* <Button onClick={addUser}>ADD ALEX</Button> */}
        <Button onClick={logout}>Log Out</Button>
      </Box>
    </Box>
  );
};

export default LoggedInHomePage;
