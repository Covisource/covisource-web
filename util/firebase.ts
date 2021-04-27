import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB62D-eQZU3iZKQw7hdGjyN79VLrpR7nmE",
  authDomain: "covisource-80b2e.firebaseapp.com",
  projectId: "covisource-80b2e",
  storageBucket: "covisource-80b2e.appspot.com",
  messagingSenderId: "69394954532",
  appId: "1:69394954532:web:3591780b18e579cb2a1bb1",
  measurementId: "G-6DSR21NBVQ",
};

if (firebase.apps.length <= 0) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth;

export { db, auth };
