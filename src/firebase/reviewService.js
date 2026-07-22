import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

const reviewRef = collection(db, "reviews");

// ---------------- ADD REVIEW ----------------

export async function addReview(review) {
  await addDoc(reviewRef, {
    ...review,
    status: "pending",
    adminReply: "",
    createdAt: serverTimestamp(),
  });
}

// ---------------- GET ALL REVIEWS ----------------

export async function getAllReviews() {
  const snap = await getDocs(reviewRef);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ---------------- GET PRODUCT REVIEWS ----------------

export async function getProductReviews(productId) {
  const q = query(
    reviewRef,
    where("productId", "==", productId)
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ---------------- GET APPROVED REVIEWS ----------------

export async function getApprovedReviewsForProduct(productId) {
  const q = query(
    reviewRef,
    where("productId", "==", productId),
    where("approved", "==", true)
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ---------------- APPROVE REVIEW ----------------

export async function approveReview(reviewId) {
  await updateDoc(doc(db, "reviews", reviewId), {
    approved: true,
  });
}

// ---------------- DELETE REVIEW ----------------

export async function deleteReview(reviewId) {
  await deleteDoc(doc(db, "reviews", reviewId));
}

// ---------------- CHECK ALREADY REVIEWED ----------------

export async function hasReviewed(orderId, productId, userId) {
  const q = query(
    reviewRef,
    where("orderId", "==", orderId),
    where("productId", "==", productId),
    where("userId", "==", userId)
  );

  const snap = await getDocs(q);

  return !snap.empty;
}

// ---------------- GET REVIEW BY ID ----------------

export async function getReviewById(reviewId) {
  const snap = await getDoc(doc(db, "reviews", reviewId));

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
}
// ---------------- REPLY TO REVIEW ----------------

export async function replyToReview(reviewId, reply) {
  await updateDoc(doc(db, "reviews", reviewId), {
    adminReply: reply,
  });
}
// ---------------- UPDATE REVIEW STATUS ----------------

export async function updateReviewStatus(reviewId, status) {
  await updateDoc(doc(db, "reviews", reviewId), {
    status,
  });
}