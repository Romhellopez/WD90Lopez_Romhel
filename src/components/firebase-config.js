import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCEuxcicbTkcDaXfvYbdctWGZRRqOmu54s",
  authDomain: "authentication-5394a.firebaseapp.com",
  projectId: "authentication-5394a",
  storageBucket: "authentication-5394a.appspot.com",
  messagingSenderId: "936669158016",
  appId: "1:936669158016:web:04b53f971ad3900ce6a465",
  measurementId: "G-CRJ4J3H8SB"
};
  
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);