import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// import * as dotenv from 'dotenv';
// dotenv.config();

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyDchLcm5MU08SRgAP-Hw1fdjWkSTCpB51w",
  authDomain: "friendly-chat-m7603.firebaseapp.com",
  projectId: "friendly-chat-m7603",
  storageBucket: "friendly-chat-m7603.appspot.com",
  messagingSenderId: "578825333117",
  appId: "1:578825333117:web:9ee3a0482fb776f2f0c414"
};



export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
