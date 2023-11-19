import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwCTKqUJGoTbmaHQxvXVeOiEsZbznEDV0",
  authDomain: "threathub-6ffc0.firebaseapp.com",
  projectId: "threathub-6ffc0",
  storageBucket: "threathub-6ffc0.appspot.com",
  messagingSenderId: "593862414955",
  appId: "1:593862414955:web:2d9ef40ef0ddd35b3ad72e",
  measurementId: "G-Z3NFB0R01V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
