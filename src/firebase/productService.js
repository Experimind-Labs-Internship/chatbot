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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./firebase";

const productsRef = collection(db, "products");

export const SIZE_OPTIONS = ["S", "M", "L", "XL"];

export async function uploadProductImage(file) {
  const fileRef = ref(storage, `products/${Date.now()}-${file.name}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
}

export async function deleteProductImage(url) {
  try {
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
  } catch (err) {
    console.warn("Image delete skipped:", err.message);
  }
}

export async function addProduct(productData) {
  const docRef = await addDoc(productsRef, {
    ...productData,
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProduct(id, productData) {
  await updateDoc(doc(db, "products", id), {
    ...productData,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(id, images = []) {
  await Promise.all(images.map((url) => deleteProductImage(url)));
  await deleteDoc(doc(db, "products", id));
}

export async function getAllProducts() {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProductById(id) {
  const snap = await getDoc(doc(db, "products", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}