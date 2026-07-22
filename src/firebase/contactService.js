import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./firebase";

const contactRef = collection(db, "contactMessages");

export async function sendContactMessage(data) {
  const docRef = await addDoc(contactRef, {
    ...data,
    createdAt: serverTimestamp(),
    status: "Unread",
  });

  return docRef.id;
}

export async function getAllMessages() {
  const q = query(
    contactRef,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function deleteMessage(id) {
  await deleteDoc(doc(db, "contactMessages", id));
}