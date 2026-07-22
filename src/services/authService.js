import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
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
    role: "customer",
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

export const getUserRole = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data().role : "customer";
};
