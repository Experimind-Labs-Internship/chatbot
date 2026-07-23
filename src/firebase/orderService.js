import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

const orderRef = collection(db, "orders");

/* ===============================
   ORDER STATUS OPTIONS
================================ */

export const ORDER_STATUSES = [
  "Processing",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

/* ===============================
   CREATE ORDER
================================ */

export async function createOrder(orderData) {
  const docRef = await addDoc(orderRef, {
    ...orderData,
    status: "Processing",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/* ===============================
   GET SINGLE ORDER
================================ */

export async function getOrderById(orderId) {
  const snapshot = await getDoc(doc(db, "orders", orderId));

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

/* ===============================
   GET USER ORDERS
================================ */

export async function getUserOrders(userId) {
  const q = query(
    orderRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* ===============================
   GET ALL ORDERS
================================ */

export async function getAllOrders() {
  const q = query(
    orderRef,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* ===============================
   UPDATE STATUS
================================ */

export async function updateOrderStatus(
  orderId,
  status
) {
  await updateDoc(doc(db, "orders", orderId), {
    status,
    updatedAt: serverTimestamp(),
  });
}


export async function cancelOrder(orderId, reason) {
  await updateDoc(doc(db, "orders", orderId), {
    status: "Cancelled",
    cancelReason: reason,
    cancelledAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/* ===============================
   GET CANCELLED ORDERS
================================ */

export async function getCancelledOrders() {
  const q = query(
    orderRef,
    where("status", "==", "Cancelled"),
    orderBy("cancelledAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}