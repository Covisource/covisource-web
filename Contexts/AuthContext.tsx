import { auth, db } from "~util/firebase";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface authContextSchema {
  user: firebase.default.User;
  emailPwdLogin: any;
  googleLogin: any;
  facebookLogin: any;
  twitterLogin: any;
  // fetchUser: any;
}

const AuthContext = React.createContext<authContextSchema>({} as any);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const usersRef = db.collection("users")
  const router = useRouter();

  const createSocialUser = async (user) => {
    const res = await usersRef.doc(user.uid).get()
    if (res.exists) {
      return;
    } else {
      await usersRef.doc(user.uid).set({
        
      })
    }
  }

  const createUser = () => {
    
  }

  const emailPwdLogin = async (email, pwd) => {
    const res = await auth().signInWithEmailAndPassword(email, pwd);
  };

  const twitterLogin = async () => {
    const provider = new auth.TwitterAuthProvider();
    const res = await auth().signInWithPopup(provider);
    console.log(res.user)
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

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);


  const value = {
    user,
    emailPwdLogin,
    facebookLogin,
    googleLogin,
    twitterLogin,
    // fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
