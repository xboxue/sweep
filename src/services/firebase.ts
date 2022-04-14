import { initializeApp } from "firebase/app";
import * as firebase from "firebase/auth";

initializeApp({
  apiKey: "AIzaSyAgj1MwO36BkL273OpzPGyTbcHTvyFmgdM",
  authDomain: "sweep-a4b1d.firebaseapp.com",
  projectId: "sweep-a4b1d",
  storageBucket: "sweep-a4b1d.appspot.com",
  messagingSenderId: "77801253117",
  appId: "1:77801253117:web:eacc23459d5aea0414f694",
  measurementId: "G-EWCLP7TXQZ",
});

const provider = new firebase.GoogleAuthProvider();
const auth = firebase.getAuth();

export const signInWithGoogle = () => {
  return firebase.signInWithPopup(auth, provider);
};

export const createUserWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return firebase.createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPassword = (email: string, password: string) => {
  return firebase.signInWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
  return firebase.signOut(auth);
};

export const refreshToken = () => {
  if (!auth.currentUser) throw new Error();
  return auth.currentUser.getIdToken(true);
};

export const onAuthStateChanged = (
  nextOrObserver: Parameters<typeof firebase.onAuthStateChanged>[1]
) => {
  return firebase.onAuthStateChanged(auth, nextOrObserver);
};

export const signInAnonymously = () => {
  return firebase.signInAnonymously(auth);
};
