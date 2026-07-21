import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const ordersRef = collection(db, "orders");

export const ORDER_STATUSES = [
  "pending",
  "processing",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

export async function createOrder({
  userId,
  guestEmail,
  items,
  shippingAddress,
  subtotal,
  discount,
  total,
  couponCode,
  paymentId,
}) {
  const docRef = await addDoc(ordersRef, {
    userId: userId || null,
    guestEmail: guestEmail || null,
    items,
    shippingAddress,
    subtotal,
    discount: discount || 0,
    total,
    couponCode: couponCode || null,
    paymentId: paymentId || null,
    paymentStatus: "paid",
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getOrderById(id) {
  const snap = await getDoc(doc(db, "orders", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function getAllOrders() {
  const q = query(ordersRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getOrdersByUser(userId) {
  const q = query(ordersRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateOrderStatus(orderId, status) {
  await updateDoc(doc(db, "orders", orderId), {
    status,
    updatedAt: serverTimestamp(),
  });
}