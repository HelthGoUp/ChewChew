import {
  addDoc,
  getDoc,
  getDocs,
  doc,
  collection,
  setDoc,
} from "@firebase/firestore";
import { db } from "./config.js";

const getUserData = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

const getCertainPosts = async (field) => {
  const docRef = collection(db, "posts");
  const querySnapshot = await getDocs(docRef);
  const data = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().tag === field) {
      data.push(doc.data());
    }
  });
  const sortedData = data.sort((a, b) => {
    const timeA = new Date(`1970-01-01T${a.time}`);
    const timeB = new Date(`1970-01-01T${b.time}`);

    if (timeA > timeB) {
      return -1;
    } else if (timeA < timeB) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedData;
};

const getPosts = async () => {
  const docRef = collection(db, "posts");
  const querySnapshot = await getDocs(docRef);
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

const addUser = async (uid, name, email, photoURL) => {
  const docSnap = getUserData(uid);
  if (docSnap) {
    let data = {
      email: email,
      name: name,
      firstName: name.split(" ")[0],
      uid: uid,
      photoURL: photoURL,
      posts: [],
    };

    const userRef = doc(db, "users", uid);
    try {
      await setDoc(userRef, data);
      console.log("success!");
    } catch (e) {
      console.log("Error is ", e);
    }
  } else {
    console.log("user with the uid of ", uid, " already exists");
  }
};

const editUser = async () => {};

const addPost = async (uid, text, time, tag, picture, location) => {
  try {
    await addDoc(collection(db, "posts"), {
      uid: uid,
      text: text,
      time: time,
      tag: tag,
      picture: picture,
      location: location,
    });
  } catch (error) {
    console.log("encountered error when adding a post: ", error);
  }
};

const deleteUser = async () => {};

export {
  getUserData,
  addUser,
  editUser,
  deleteUser,
  addPost,
  getPosts,
  getCertainPosts,
};
