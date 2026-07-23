import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import {
  auth,
  db,
  googleProvider,
} from "../firebase/firebase";

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
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(
    auth,
    googleProvider
  );

  const user = result.user;

  const userRef = doc(db, "users", user.uid);

  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email,
      role: "customer",
      createdAt: new Date(),
    });
  }

  return user;
};

export const logout = () => signOut(auth);

export const getUserRole = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data().role : "customer";
};

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("✅ Reset email request accepted by Firebase");
  } catch (error) {
    console.log("❌ Error code:", error.code);
    console.log("❌ Error message:", error.message);
    throw error;
  }
};
