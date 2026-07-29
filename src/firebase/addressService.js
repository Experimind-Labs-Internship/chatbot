import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

// Save Address
export const saveAddress = async (userId, address) => {
  const ref = collection(db, "users", userId, "addresses");

  const docRef = await addDoc(ref, {
    ...address,
    isDefault: address.isDefault ?? false,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

// Get All Addresses
export const getAddresses = async (userId) => {
  const ref = collection(db, "users", userId, "addresses");

  const q = query(ref, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Update Address
export const updateAddress = async (
  userId,
  addressId,
  updatedData
) => {
  const ref = doc(db, "users", userId, "addresses", addressId);

  await updateDoc(ref, {
  ...updatedData,
  updatedAt: serverTimestamp(),
});
};

// Delete Address
export const deleteAddress = async (
  userId,
  addressId
) => {
  const ref = doc(db, "users", userId, "addresses", addressId);

  await deleteDoc(ref);
};

// Set Default Address
export const setDefaultAddress = async (
  userId,
  selectedId
) => {
  const ref = collection(db, "users", userId, "addresses");

  const snapshot = await getDocs(ref);

  const promises = snapshot.docs.map((d) =>
    updateDoc(d.ref, {
      isDefault: d.id === selectedId,
    })
  );

  await Promise.all(promises);
};