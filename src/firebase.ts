import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjM-5c3r-J4-l4awAbAE8QIUQsjOXPaqU",
  authDomain: "trainee-app-1b59f.firebaseapp.com",
  projectId: "trainee-app-1b59f",
  storageBucket: "trainee-app-1b59f.appspot.com",
  messagingSenderId: "434146950832",
  appId: "1:434146950832:web:3dc4e10934aced34004575",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
