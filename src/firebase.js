import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCZWMttIQpQCi9kfcy-5CK962ZoJ3mG2yI",
  authDomain: "instagram-clone-cf700.firebaseapp.com",
  databaseURL: "https://instagram-clone-cf700.firebaseio.com",
  projectId: "instagram-clone-cf700",
  storageBucket: "instagram-clone-cf700.appspot.com",
  messagingSenderId: "759477215097",
  appId: "1:759477215097:web:f4fffa265e2ec2b52219a8",
  measurementId: "G-6JWX9YDB6Z"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
