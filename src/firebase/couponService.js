import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

const couponsRef = collection(db, "coupons");

// Create Coupon
export async function addCoupon(coupon) {
  const docRef = await addDoc(couponsRef, {
    ...coupon,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

// Get All Coupons
export async function getAllCoupons() {
  const snapshot = await getDocs(couponsRef);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

// Get Coupon by ID
export async function getCouponById(id) {
  const snap = await getDoc(doc(db, "coupons", id));

  return snap.exists()
    ? { id: snap.id, ...snap.data() }
    : null;
}

// Update Coupon
export async function updateCoupon(id, coupon) {
  await updateDoc(doc(db, "coupons", id), {
    ...coupon,
    updatedAt: serverTimestamp(),
  });
}

// Delete Coupon
export async function deleteCoupon(id) {
  await deleteDoc(doc(db, "coupons", id));
}

// Validate Coupon
export async function validateCoupon(code) {
  const q = query(
    couponsRef,
    where("code", "==", code.toUpperCase()),
    where("active", "==", true)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const coupon = snapshot.docs[0].data();

  // Check expiry date
  if (new Date(coupon.expiryDate) < new Date()) {
    return null;
  }

  return {
    id: snapshot.docs[0].id,
    ...coupon,
  };
}