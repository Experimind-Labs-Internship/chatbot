import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

const cartRef = collection(db, "cart");

// ---------------- ADD TO CART ----------------

export async function addToCart(cartItem) {
  await addDoc(cartRef, {
    ...cartItem,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

// ---------------- GET USER CART ----------------

export async function getCart(userId) {
  const q = query(cartRef, where("userId", "==", userId));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ---------------- UPDATE QUANTITY ----------------

export async function updateCartItem(id, quantity) {
  await updateDoc(doc(db, "cart", id), {
    quantity,
    updatedAt: serverTimestamp(),
  });
}

// ---------------- REMOVE ITEM ----------------

export async function removeCartItem(id) {
  await deleteDoc(doc(db, "cart", id));
}

// ---------------- CLEAR CART ----------------

export async function clearCart(userId) {
  const q = query(cartRef, where("userId", "==", userId));

  const snapshot = await getDocs(q);

  await Promise.all(
    snapshot.docs.map((d) => deleteDoc(doc(db, "cart", d.id)))
  );
}