// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVRa3APAtGQOoF8jXCngRqlUfiedkixP0",
  authDomain: "mychatapp-35325.firebaseapp.com",
  projectId: "mychatapp-35325",
  storageBucket: "mychatapp-35325.appspot.com",
  messagingSenderId: "578776682838",
  appId: "1:578776682838:web:712a0b710799e9af2006f7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
