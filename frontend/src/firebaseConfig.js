// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU_FBbZ31kGBHiPFld_j_wkcrR91Zxtsg",
  authDomain: "pc1-chat-web.firebaseapp.com",
  projectId: "pc1-chat-web",
  storageBucket: "pc1-chat-web.appspot.com",
  messagingSenderId: "51897482670",
  appId: "1:51897482670:web:14affb74cff0339ad7dc3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };