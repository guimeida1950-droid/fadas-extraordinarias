
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA8Wd5g1slqh1oRwrQ5vPYDCKSotvj8vXQ",
  authDomain: "login-989e9.firebaseapp.com",
  projectId: "login-989e9",
  storageBucket: "login-989e9.firebasestorage.app",
  messagingSenderId: "661005848959",
  appId: "1:661005848959:web:4087e503c755f559734a4a",
  measurementId: "G-YYH26KXRQB",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

isSupported()
  .then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  })
  .catch((error) => {
    console.warn("Analytics indisponível:", error);
  });

export default app;
