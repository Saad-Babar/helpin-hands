// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-2wC_5BCQBlOlQUtYBGcMY6JP_kCe5S8",
  authDomain: "helpin-hands.firebaseapp.com",
  projectId: "helpin-hands",
  storageBucket: "helpin-hands.firebasestorage.app",
  messagingSenderId: "497238684776",
  appId: "1:497238684776:web:b9bb1dc3db0e57748cb7dd",
  measurementId: "G-D833Y603R5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);