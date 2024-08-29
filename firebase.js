import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDJQ2S1fpK5HU2eaqg6c4zowI5mAfsW8PM",
  authDomain: "flashcardsaas-c2815.firebaseapp.com",
  projectId: "flashcardsaas-c2815",
  storageBucket: "flashcardsaas-c2815.appspot.com",
  messagingSenderId: "191428845393",
  appId: "1:191428845393:web:b21e0bf10e10562a3b3d70",
  measurementId: "G-9K463RLVWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { db, analytics };
