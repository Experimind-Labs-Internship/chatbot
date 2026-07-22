import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

/* -----------------------------
   Get User Profile
------------------------------*/
export async function getUserProfile(uid) {
  try {
    const ref = doc(db, "users", uid);

    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return {
      id: snap.id,
      ...snap.data(),
    };
  } catch (err) {
    console.error("Error loading profile:", err);
    throw err;
  }
}

/* -----------------------------
   Create Profile
------------------------------*/
export async function createUserProfile(uid, data) {
  try {
    const ref = doc(db, "users", uid);

    await setDoc(
      ref,
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    console.error("Error creating profile:", err);
    throw err;
  }
}

/* -----------------------------
   Update Profile
------------------------------*/
export async function updateUserProfile(uid, data) {
  try {
    const ref = doc(db, "users", uid);

    await updateDoc(ref, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    throw err;
  }
}

/* -----------------------------
   Save Address
------------------------------*/
export async function updateAddress(uid, address) {
  try {
    const ref = doc(db, "users", uid);

    await updateDoc(ref, {
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Error updating address:", err);
    throw err;
  }
}