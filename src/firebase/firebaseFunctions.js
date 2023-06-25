import {
  addDoc,
  getDoc,
  deleteDoc,
  getDocs,
  updateDoc,
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

const addPost = async (uid, text, date, tag, picture, name) => {
  try {
    await addDoc(collection(db, "posts"), {
      uid: uid,
      text: text,
      date: date,
      tag: tag,
      picture: picture,
      name: name,
    });
  } catch (error) {
    console.log("encountered error when adding a post: ", error);
  }
};

const deleteUser = async () => {};

export { getUserData, addUser, editUser, deleteUser, addPost };
