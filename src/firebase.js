
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth'; 

//for 9.x versions
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBOYeGx0DeojM-5nPNUSFPEmDMNw82ZrGs",
  authDomain: "instagram-clone-react-f0bfa.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-f0bfa-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-react-f0bfa",
  storageBucket: "instagram-clone-react-f0bfa.appspot.com",
  messagingSenderId: "4937886355",
  appId: "1:4937886355:web:301cdaba82b2940ee7bb66",
  measurementId: "G-T1K08CH2CZ"
});

const db= firebaseApp.firestore();
const auth=firebase.auth();
// const storage=firebase.storage();

export { db, auth }; 