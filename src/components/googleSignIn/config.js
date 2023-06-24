import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0oRomHJDdnvqJmi3OMqlufJqrgU1qW18",
  authDomain: "healthgoup-65daa.firebaseapp.com",
  projectId: "healthgoup-65daa",
  storageBucket: "healthgoup-65daa.appspot.com",
  messagingSenderId: "824743481346",
  appId: "1:824743481346:web:bd781d1dc96d921b30971b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
