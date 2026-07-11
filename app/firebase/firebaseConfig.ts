// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbH2PnNyBIrLewd-BHLe3CmJQwkbHpS5c",
    authDomain: "medreminder-app-77591.firebaseapp.com",
    projectId: "medreminder-app-77591",
    storageBucket: "medreminder-app-77591.firebasestorage.app",
    messagingSenderId: "875286545384",
    appId: "1:875286545384:web:00fb4588011ecc98b05a5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);



export const db = getFirestore(app);