// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXD-xJ2z0kFLfevZhaR3zOerDnXpK7By0",
  authDomain: "eas-todo.firebaseapp.com",
  projectId: "eas-todo",
  storageBucket: "eas-todo.appspot.com",
  messagingSenderId: "851522480971",
  appId: "1:851522480971:web:6ef9a5392cd25c635916ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
