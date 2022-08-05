import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyADYK-9qGCx6fdJPGS6Y0B_wRw9TOK7Zk4",
  authDomain: "mentostark-31331.firebaseapp.com",
  projectId: "mentostark-31331",
  storageBucket: "mentostark-31331.appspot.com",
  messagingSenderId: "387270232884",
  appId: "1:387270232884:web:7e8a287bc343a950b5b361",
  measurementId: "G-N27GH4EDRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
