// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ✅ Add this
import { addDoc, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoYQ7yB_qZga575ao2Pdy0XK-LonJbgRE",
  authDomain: "pokesite-85bfd.firebaseapp.com",
  projectId: "pokesite-85bfd",
  storageBucket: "pokesite-85bfd.firebasestorage.app",
  messagingSenderId: "280662904292",
  appId: "1:280662904292:web:49a533053e753c86148bf1",
  measurementId: "G-VHN6308ETS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // ✅ Define it


// ✅ Export the db so it can be used in your components
export { db };
