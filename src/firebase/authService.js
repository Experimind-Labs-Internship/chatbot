import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "../firebase/firebase";

export async function signup(name, email, password) {
  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await updateProfile(userCredential.user, {
    displayName: name,
  });

  await setDoc(
    doc(db, "users", userCredential.user.uid),
    {
      uid: userCredential.user.uid,
      name,
      email,
      createdAt: new Date(),
    }
  );

  return userCredential.user;
}

export async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
}