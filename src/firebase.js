// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABaCMS7WRCyTUElOIt8K4o13Ailyh8aRI",
  authDomain: "dreamover369.firebaseapp.com",
  projectId: "dreamover369",
  storageBucket: "dreamover369.appspot.com",
  messagingSenderId: "660271016856",
  appId: "1:660271016856:web:bdc4e71fdf405ff8a019ed",
  measurementId: "G-5LCZBJDGP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export necessary Firebase utilities
export { auth, RecaptchaVerifier, signInWithPhoneNumber };
