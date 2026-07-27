import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

const wishlistRef = collection(db, "wishlist");

// ---------------- ADD ----------------

export async function addToWishlist(item) {
  await addDoc(wishlistRef, {
    ...item,
    createdAt: serverTimestamp(),
  });
}

// ---------------- GET ----------------

export async function getWishlist(userId) {
  const q = query(
    wishlistRef,
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ---------------- CHECK ----------------

export async function getWishlistItem(userId, productId) {
  const q = query(
    wishlistRef,
    where("userId", "==", userId),
    where("productId", "==", productId)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
}

// ---------------- REMOVE ----------------

export async function removeWishlistItem(id) {
  await deleteDoc(doc(db, "wishlist", id));
}