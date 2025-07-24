import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import fs from "fs";

const inventory = JSON.parse(fs.readFileSync("./src/firebase/curr_inventory.json", "utf8"));

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBoYQ7yB_qZga575ao2Pdy0XK-LonJbgRE",
    authDomain: "pokesite-85bfd.firebaseapp.com",
    projectId: "pokesite-85bfd",
    storageBucket: "pokesite-85bfd.firebasestorage.app",
    messagingSenderId: "280662904292",
    appId: "1:280662904292:web:49a533053e753c86148bf1",
    measurementId: "G-VHN6308ETS"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadInventory() {
  const colRef = collection(db, "products");

  for (const item of inventory) {
    try {
      await addDoc(colRef, item);
      console.log(`Uploaded: ${item.name}`);
    } catch (error) {
      console.error("Error uploading item:", item.name, error);
    }
  }

  console.log("All inventory uploaded.");
}

uploadInventory();
