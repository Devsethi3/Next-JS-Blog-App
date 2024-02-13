import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0Jeiws_w8ZkVSMRfoNdb66KgdXV59_pM",
  authDomain: "react-project-aac0f.firebaseapp.com",
  databaseURL:
    "https://react-project-aac0f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-project-aac0f",
  storageBucket: "react-project-aac0f.appspot.com",
  messagingSenderId: "613196061075",
  appId: "1:613196061075:web:28b33150d9efb427e6b066",
  measurementId: "G-DNFYDKFBD4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
