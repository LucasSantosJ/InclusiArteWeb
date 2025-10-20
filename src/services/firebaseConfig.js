
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYiPcEoiFt8v9NaJmYXKbpLl_fCR26Rlg",
  authDomain: "inclusiarteweb.firebaseapp.com",
  projectId: "inclusiarteweb",
  storageBucket: "inclusiarteweb.firebasestorage.app",
  messagingSenderId: "103818254549",
  appId: "1:103818254549:web:de6b30cbfb758be9fd2a5c",
  measurementId: "G-SL3428QRL8"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);