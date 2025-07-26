import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD3woncKcNSIRBubUV3TGhqYLI2bowisGY",
  authDomain: "guel-raffle.firebaseapp.com",
  projectId: "guel-raffle",
  storageBucket: "guel-raffle.firebasestorage.app",
  messagingSenderId: "351945069603",
  appId: "1:351945069603:web:73a63a8245d0b71b7ecd96",
  measurementId: "G-1DYCMWNWY0"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const firestore = getFirestore(app);
const analytics = getAnalytics(app);