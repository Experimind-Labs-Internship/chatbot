import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "./firebase";

const returnsRef = collection(db, "returns");

export async function getReturnRequest(orderId, productId) {
  if (!auth.currentUser) return null;

  const q = query(
    returnsRef,
    where("orderId", "==", orderId),
    where("productId", "==", productId),
    where("userId", "==", auth.currentUser.uid)
  );

  const snap = await getDocs(q);

  if (snap.empty) return null;

  return {
    id: snap.docs[0].id,
    ...snap.docs[0].data(),
  };
}



// Customer creates a return request
export async function createReturnRequest(data) {
  await addDoc(returnsRef, {
    ...data,
    status: "Pending",
    createdAt: serverTimestamp(),
  });
}

// Check if a return request already exists

// Customer gets their returns
export async function getUserReturns(userId) {
  const q = query(
    returnsRef,
    where("userId", "==", userId)
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Admin gets all returns
export async function getAllReturns() {
  const snap = await getDocs(returnsRef);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Admin updates return status
export async function updateReturnStatus(id, status) {
  await updateDoc(doc(db, "returns", id), {
    status,
  });
}