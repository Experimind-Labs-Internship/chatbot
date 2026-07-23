import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const newsletterRef = collection(db, "newsletter");

/**
 * Subscribe a new email to the newsletter.
 * @param {string} email
 * @returns {Promise<string>} document ID
 */
export async function subscribeToNewsletter(email) {
  const docRef = await addDoc(newsletterRef, {
    email,
    subscribedAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Get all subscribers ordered by newest first.
 * @returns {Promise<Array<{id: string, email: string, subscribedAt: Date|null}>>}
 */
export async function getAllSubscribers() {
  const q = query(newsletterRef, orderBy("subscribedAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    email: doc.data().email,
    subscribedAt: doc.data().subscribedAt?.toDate() || null,
  }));
}

/**
 * Delete a subscriber by document ID.
 * @param {string} id
 */
export async function deleteSubscriber(id) {
  await deleteDoc(doc(db, "newsletter", id));
}

/**
 * Count subscribers created today.
 * @returns {Promise<number>}
 */
export async function getTodaySubscriberCount() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDayTimestamp = Timestamp.fromDate(startOfDay);

  const q = query(
    newsletterRef,
    where("subscribedAt", ">=", startOfDayTimestamp)
  );
  const snapshot = await getDocs(q);
  return snapshot.size;
}

/**
 * Count subscribers created this month.
 * @returns {Promise<number>}
 */
export async function getMonthSubscriberCount() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfMonthTimestamp = Timestamp.fromDate(startOfMonth);

  const q = query(
    newsletterRef,
    where("subscribedAt", ">=", startOfMonthTimestamp)
  );
  const snapshot = await getDocs(q);
  return snapshot.size;
}

