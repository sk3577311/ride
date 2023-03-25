// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyFid0N-ll7nJNpA4LRCTaPcgMOQSNCzI",
  authDomain: "vue3-social-login.firebaseapp.com",
  projectId: "vue3-social-login",
  storageBucket: "vue3-social-login.appspot.com",
  messagingSenderId: "1043086831460",
  appId: "1:1043086831460:web:5eed1c62f907feb761d471",
  measurementId: "G-VPZREC6N62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;