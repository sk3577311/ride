// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDQYTV7WCaj3LoZZ6AmpTqT4tWmdQrQp8w",
  authDomain: "login-4c73e.firebaseapp.com",
  projectId: "login-4c73e",
  storageBucket: "login-4c73e.appspot.com",
  messagingSenderId: "60807856972",
  appId: "1:60807856972:web:9a20ef940ef4f62b7b05e9",
  measurementId: "G-RNMJPLL5FB"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase