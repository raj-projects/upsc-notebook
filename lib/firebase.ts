import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "upsc-dreams-demo.firebaseapp.com",
  projectId: "upsc-dreams-demo",
  storageBucket: "upsc-dreams-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
};

let app;
let auth;
let googleProvider;
let db;
let storage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.warn("Firebase initialization failed - using demo mode");
}

export { auth, googleProvider, db, storage };
export default app;
