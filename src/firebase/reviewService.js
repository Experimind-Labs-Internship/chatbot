import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const reviewsRef = collection(db, "reviews");

export async function submitReview({ productId, orderId, userId, userName, rating, comment }) {
  await addDoc(reviewsRef, {
    productId,
    orderId,
    userId,
    userName,
    rating,
    comment,
    status: "pending", // pending | approved | rejected
    adminReply: null,
    createdAt: serverTimestamp(),
  });
}

export async function getAllReviews() {
  const q = query(reviewsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getApprovedReviewsForProduct(productId) {
  const q = query(
    reviewsRef,
    where("productId", "==", productId),
    where("status", "==", "approved")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateReviewStatus(reviewId, status) {
  await updateDoc(doc(db, "reviews", reviewId), { status });
}

export async function replyToReview(reviewId, replyText) {
  await updateDoc(doc(db, "reviews", reviewId), { adminReply: replyText });
}

export async function deleteReview(reviewId) {
  await deleteDoc(doc(db, "reviews", reviewId));
}

// Check if this user already reviewed this product for this order
export async function hasReviewed(orderId, productId) {
  const q = query(
    reviewsRef,
    where("orderId", "==", orderId),
    where("productId", "==", productId)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}