import React, { useContext, useState } from "react";
import { SignedInContext } from "../../helper/Context";
import {
  Box,
  Button,
  HStack,
  Img,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
  Textarea,
  Tag,
} from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { addPost } from "../../firebase/firebaseFunctions";
import Header from "../header/Header";
import RecipeCard from "../RecipeCard";

const LoggedInHomePage = () => {
  const { value } = useContext(SignedInContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formValue, setFormValue] = useState("");
  const [imageURL, setImageURL] = useState(`/images/UploadPhotoButton.svg`);
  const [postType, setPostType] = useState("Cooked Creations");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageURL(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleClose = () => {
    onClose();
    setFormValue("");
    setPostType("");
    setImageURL(`/images/UploadPhotoButton.svg`);
  };

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

  const PostTag = ({ text }) => {
    return (
      <Tag
        onClick={() => {
          setPostType(text);
        }}
        _hover={{
          cursor: "pointer",
        }}
        backgroundColor={postType === text ? "#FF6700" : ""}
        color={postType === text ? "white" : ""}
        size="lg"
        fontSize="16px"
      >
        {text}
      </Tag>
    );
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
        <Button onClick={onOpen}>Open the modal</Button>
        <Button onClick={handleClick}>handle click</Button>
        <Button onClick={logout}>Log Out</Button>
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent maxW="800px">
            <HStack position="relative" backgroundColor="#fcfaef">
              <label htmlFor="imageUpload">
                <Img
                  _hover={{
                    cursor: "pointer",
                  }}
                  m="20px"
                  boxSize="310px"
                  src={imageURL}
                  alt="upload image"
                />
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </label>
              <VStack alignItems="baseline">
                <ModalHeader
                  pt="0px"
                  pl="0px"
                  fontSize="30px"
                  className="header-font"
                  color="#0C5446"
                >
                  Share your food!
                </ModalHeader>
                <Textarea
                  fontSize="1em"
                  width="420px"
                  h="100px"
                  placeholder="Write a caption..."
                  value={formValue}
                  onChange={(event) => {
                    setFormValue(event.target.value);
                  }}
                />
                <HStack mt="10px">
                  <PostTag text="Cooked Creations" />
                  <PostTag text="Free Food" />
                </HStack>
                <ModalCloseButton
                  left="390px"
                  top="-225px"
                  position="relative"
                />

                <Button
                  w="100%"
                  backgroundColor="#FF6700"
                  color="white"
                  _hover={{ backgroundColor: "#BF4D00" }}
                  isDisabled={
                    formValue === "" ||
                    imageURL === `/images/UploadPhotoButton.svg`
                  }
                  fontSize="18px"
                >
                  Post
                </Button>
              </VStack>
            </HStack>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default LoggedInHomePage;
