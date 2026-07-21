import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function validateCoupon(code) {
  const q = query(
    collection(db, "coupons"),
    where("code", "==", code.trim().toUpperCase()),
    where("active", "==", true)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const coupon = snapshot.docs[0].data();
  return { id: snapshot.docs[0].id, ...coupon };
}