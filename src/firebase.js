// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDHLFJZFMW7aPATzf7HykXm6KexQsooUdk",
  authDomain: "cedimec-e4896.firebaseapp.com",
  projectId: "cedimec-e4896",
  storageBucket: "cedimec-e4896.firebasestorage.app",
  messagingSenderId: "1077141330426",
  appId: "1:1077141330426:web:d9810dd299fb95b596ec43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
