import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Sign in
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return <AuthContext.Provider value={{ googleSignIn }}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
