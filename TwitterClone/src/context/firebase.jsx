import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7KS4-dfQZs4gHOfdcQh2pb1-M4ioY1UI",
  authDomain: "twitterclone-6c287.firebaseapp.com",
  projectId: "twitterclone-6c287",
  storageBucket: "twitterclone-6c287.firebasestorage.app",
  messagingSenderId: "906282533930",
  appId: "1:906282533930:web:e311646793dca341752f53",
  measurementId: "G-VERVYM33BX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app