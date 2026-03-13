import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbpY-h0PLM6pGsnmdsuFx2jsoVOkB16l8", // Firebase Console se mili asli key yahan dalein
  authDomain: "azams-76fad.firebaseapp.com",
  projectId: "azams-76fad",
  storageBucket: "azams-76fad.firebasestorage.app",
  messagingSenderId: "1073002567045",
  appId:"1:1073002567045:web:72b2d10cf10497f984a0ec"
};

// 1. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Auth aur Provider ko variable mein save karein
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// 3. In sab ko EXPORT karein taake LoginScreen inhe use kar sakay
export { auth, googleProvider, signInWithPopup };