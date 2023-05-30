import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAx49rsBmU-bd7BXuZI2_bJGZjCYSL-xhs",
  authDomain: "quiubo-1c249.firebaseapp.com",
  projectId: "quiubo-1c249",
  storageBucket: "quiubo-1c249.appspot.com",
  messagingSenderId: "923721800847",
  appId: "1:923721800847:web:029cc5e33afab7469fa4fa",
};

// initialice app
export const app = initializeApp(firebaseConfig);

// get Services
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
