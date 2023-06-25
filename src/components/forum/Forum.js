import {
  Box,
  Button,
  Heading,
  HStack,
  Img,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tag,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase/config";
import { addPost, getCertainPosts } from "../../firebase/firebaseFunctions";
import ForumPost from "./ForumPost";
import { SignedInContext } from "../../helper/Context";

const Forum = () => {
  const { value } = useContext(SignedInContext);
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState("Cooked Creations");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formValue, setFormValue] = useState("");
  const [location, setLocation] = useState("");
  const [imageURL, setImageURL] = useState(`/images/UploadPhotoButton.svg`);
  const [postType, setPostType] = useState("Cooked Creations");
  const [imageUpload, setImageUpload] = useState(null);

  const [downloadURL, setDownloadURL] = useState(null);

  const [currentTime, setCurrentTime] = useState("");

  const handleClick = async () => {
    let data = await getCertainPosts(state);
    setPosts(data);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setImageUpload(file);

    reader.onload = (e) => {
      setImageURL(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    handleClick();
  }, [state]);

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

  const uploadPost = () => {
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
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
        await addPost(
          value,
          formValue,
          currentTime,
          postType,
          downloadURL,
          location
        );
      };
      makePost();
      handleClick();
      onClose();
      resetValues();
    }
  }, [downloadURL]);

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
    <VStack w="80%" h="100%">
      <HStack>
        <VStack>
          <Heading fontWeight="semibold">The Food Forum</Heading>
          <Heading fontSize="14px" fontWeight="normal">
            {state === "Cooked Creations"
              ? "See others' delicious creations with their leftover ingredients!"
              : "Find free food around the University of British Columbia campus!"}
          </Heading>
          <HStack>
            <Button
              onClick={() => {
                setState("Cooked Creations");
              }}
              backgroundColor={
                state === "Cooked Creations" ? "orange.500" : "orange.100"
              }
              color={state === "Cooked Creations" ? "white" : "orange.800"}
            >
              Cooked Creations
            </Button>
            <Button
              onClick={() => {
                setState("Food Share");
              }}
              backgroundColor={
                state === "Food Share" ? "orange.500" : "orange.100"
              }
              color={state === "Food Share" ? "white" : "orange.800"}
            >
              Food Share
            </Button>
          </HStack>
          <Button onClick={onOpen}>Share your rendition</Button>
          <SimpleGrid columns={4} spacing={4}>
            {posts.map((post, key) => {
              return (
                <Box key={key} p={4}>
                  <ForumPost data={post} key={key} />
                </Box>
              );
            })}
          </SimpleGrid>
        </VStack>
      </HStack>
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
                objectFit="cover"
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
    </VStack>
  );
};

export default Forum;
