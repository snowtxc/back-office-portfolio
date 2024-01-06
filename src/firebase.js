import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMhon_9i0X_uNcoFkkvxE605LJJ_VgbAc",
  authDomain: "portfolio-personal-47e3e.firebaseapp.com",
  projectId: "portfolio-personal-47e3e",
  storageBucket: "portfolio-personal-47e3e.appspot.com",
  messagingSenderId: "194729013629",
  appId: "1:194729013629:web:a5fe544196023da1f15c14",
  measurementId: "G-C1FD5DCLR2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
