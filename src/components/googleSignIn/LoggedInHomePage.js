import React, { useContext, useState, useEffect } from "react";
import { SignedInContext, TabContext } from "../../helper/Context";
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
  Input,
} from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { addPost } from "../../firebase/firebaseFunctions";
import Header from "../header/Header";
import RecipeCard from "../RecipeCard";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import NavbarPrivate from "../../navbar/NavbarPrivate";
import Recipes from "../recipes/Recipes";
import Forum from "../forum/Forum";

const LoggedInHomePage = () => {
  const { value } = useContext(SignedInContext);
  const { tab } = useContext(TabContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formValue, setFormValue] = useState("");
  const [location, setLocation] = useState("");
  const [imageURL, setImageURL] = useState(`/images/UploadPhotoButton.svg`);
  const [postType, setPostType] = useState("Cooked Creations");
  const [imageUpload, setImageUpload] = useState(null);

  const [downloadURL, setDownloadURL] = useState(null);

  const [currentTime, setCurrentTime] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setImageUpload(file);

    reader.onload = (e) => {
      setImageURL(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const resetValues = () => {
    setFormValue("");
    setLocation("");
    setDownloadURL(null);
    setPostType("Cooked Creations");
    setImageURL(`/images/UploadPhotoButton.svg`);
  };

  const handleClose = () => {
    onClose();
    resetValues();
  };

  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  const uploadPost = () => {
    console.log(imageUpload.name, " is the url");
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    // const reference = ref(storage, imageUpload.name);
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        setDownloadURL(downloadURL);
      });
  };

  // set the time
  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");

      setCurrentTime(`${formattedHours}:${formattedMinutes}`);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (downloadURL) {
      const makePost = async () => {
        // const querySnapshot = await getDocs(collection(db, "posts"));
        await addPost(
          value,
          formValue,
          currentTime,
          postType,
          downloadURL,
          location
        );
      };
      // image -> downloadURL
      // name -> get from value
      // image -> get from value
      // time -> get from current time
      // description -> get from formValue
      // location -> get from location
      makePost();
      onClose();
      resetValues();
    }
  }, [downloadURL]);

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

  return (
    <Box h="80vh" align="center">
      {/* <Header /> */}
      <NavbarPrivate />
      {tab ? <Recipes /> : <Forum />}
    </Box>
  );
};

export default LoggedInHomePage;

/*

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
                  borderRadius="7px"
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
                  mb={postType === "Cooked Creations" && "10px"}
                  pb="10px"
                  fontSize="30px"
                  className="header-font"
                  color="#0C5446"
                >
                  Share your food!
                </ModalHeader>
                <HStack mt="10px">
                  <PostTag text="Cooked Creations" />
                  <PostTag text="Food Share" />
                </HStack>
                <Textarea
                  fontSize="1em"
                  width="420px"
                  h={postType === "Food Share" ? "70px" : "100px"}
                  placeholder="Write a caption..."
                  value={formValue}
                  onChange={(event) => {
                    setFormValue(event.target.value);
                  }}
                />
                {postType === "Food Share" && (
                  <Input
                    fontSize="1em"
                    width="420px"
                    placeholder="Tell us where you are!"
                    value={location}
                    onChange={(event) => {
                      setLocation(event.target.value);
                    }}
                  />
                )}
                <ModalCloseButton
                  left="390px"
                  top={postType === "Food Share" ? "-240px" : "-225px"}
                  position="relative"
                />

                <Button
                  w="100%"
                  backgroundColor="#FF6700"
                  color="white"
                  _hover={{ backgroundColor: "#BF4D00" }}
                  isDisabled={
                    formValue === "" ||
                    (formValue === "Food Share" && location === "") ||
                    imageURL === `/images/UploadPhotoButton.svg`
                  }
                  onClick={uploadPost}
                  fontSize="18px"
                >
                  Post
                </Button>
              </VStack>
            </HStack>
          </ModalContent>
        </Modal>
      </Box>

*/
