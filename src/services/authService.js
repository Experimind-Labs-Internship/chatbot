import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

export const signup = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await setDoc(doc(db, "users", userCredential.user.uid), {
    uid: userCredential.user.uid,
    name,
    email,
    createdAt: new Date(),
  });

  return userCredential.user;
};

export const login = async (email, password) => {
  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return userCredential.user;
};

export const logout = () => signOut(auth);