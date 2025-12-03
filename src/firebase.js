// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqbtSyrPUV92APFEzfiXwHM1y-cY6ucaQ",
  authDomain: "rentalhub-creed.firebaseapp.com",
  projectId: "rentalhub-creed",
  storageBucket: "rentalhub-creed.firebasestorage.app",
  messagingSenderId: "927793490310",
  appId: "1:927793490310:web:03b7cbaf1fbecbeb052407",
  measurementId: "G-M9G0J603P4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

