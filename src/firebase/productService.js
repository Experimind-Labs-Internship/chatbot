import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { increment } from "firebase/firestore";

import { db } from "./firebase";

const productsRef = collection(db, "products");

export const SIZE_OPTIONS = ["S", "M", "L", "XL"];

// ---------------- ADD PRODUCT ----------------

export async function addProduct(productData) {
  const docRef = await addDoc(productsRef, {
    ...productData,
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

// ---------------- UPDATE PRODUCT ----------------

export async function updateProduct(id, productData) {
  await updateDoc(doc(db, "products", id), {
    ...productData,
    updatedAt: serverTimestamp(),
  });
}

// ---------------- UPDATE PRODUCT STOCK ----------------

export async function updateProductStock(productId, size, quantity) {
  console.log("productId:", productId);
  console.log("size:", size);
  console.log("quantity:", quantity);

  const productRef = doc(db, "products", productId);

  await updateDoc(productRef, {
    [`sizes.${size}.stock`]: increment(-quantity),
    updatedAt: serverTimestamp(),
  });

  console.log("Stock updated successfully!");
}
 

// ---------------- DELETE PRODUCT ----------------

export async function deleteProduct(id) {
  await deleteDoc(doc(db, "products", id));
}

// ---------------- GET ALL PRODUCTS ----------------

export async function getAllProducts() {
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

// ---------------- GET PRODUCT BY ID ----------------

export async function getProductById(id) {
  const snap = await getDoc(doc(db, "products", id));

  return snap.exists()
    ? { id: snap.id, ...snap.data() }
    : null;
}