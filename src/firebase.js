// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArxQpFLiRQTgBcsJY7V7SyMB2ReeILNFY",
  authDomain: "todo-app-bcce4.firebaseapp.com",
  projectId: "todo-app-bcce4",
  storageBucket: "todo-app-bcce4.firebasestorage.app",
  messagingSenderId: "299432364639",
  appId: "1:299432364639:web:e37dd890965dd199e829ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth };