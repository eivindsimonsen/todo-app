// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.YOUR_DB_PASSWORD,
  authDomain: import.meta.env.YOUR_DB_DOMAIN,
  projectId: "eas-todo", // Couldn't use env variable here for some reason, would break the db. Console says internet connection is failing
  storageBucket: import.meta.env.YOUR_DB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.YOUR_DB_SENDER_ID,
  appId: import.meta.env.YOUR_DB_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
