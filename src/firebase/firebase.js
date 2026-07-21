import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPqV_SLHbFnVRXLgxxfpZq3r27sODFSMA",
  authDomain: "yumi-store-efd7f.firebaseapp.com",
  projectId: "yumi-store-efd7f",
  storageBucket: "yumi-store-efd7f.firebasestorage.app",
  messagingSenderId: "717447838600",
  appId: "1:717447838600:web:41bb235b05e393e062583d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);