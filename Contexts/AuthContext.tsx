import { auth, db } from "~util/firebase";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface authContextSchema {
  emailPwdLogin: any;
  googleLogin: any;
  facebookLogin: any;
  twitterLogin: any;
  fetchUser: any;
}

const AuthContext = React.createContext<authContextSchema>({} as any);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const router = useRouter();

  const createUser = () => {
    
  }

  const emailPwdLogin = async (email, pwd) => {
    const res = await auth().signInWithEmailAndPassword(email, pwd);
  };

  const twitterLogin = async () => {
    const provider = new auth.TwitterAuthProvider();
    auth().signInWithRedirect(provider);
    await auth().getRedirectResult();
  };

  const googleLogin = async () => {
    const provider = new auth.GoogleAuthProvider();
    auth().signInWithRedirect(provider);
    await auth().getRedirectResult();
  };

  const facebookLogin = async () => {
    const provider = new auth.FacebookAuthProvider();
    auth().signInWithRedirect(provider);
    await auth().getRedirectResult();
  };

  const fetchUser = () => {
    return auth().currentUser;
  };

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
  }, []);

  const value = {
    emailPwdLogin,
    facebookLogin,
    googleLogin,
    twitterLogin,
    fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
