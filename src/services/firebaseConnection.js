/* eslint-disable no-unused-vars */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfQxnI0MWc1ULh_xT4j3NO6a0SAXsklzI",
  authDomain: "cadastro-5552c.firebaseapp.com",
  projectId: "cadastro-5552c",
  storageBucket: "cadastro-5552c.appspot.com",
  messagingSenderId: "240734245314",
  appId: "1:240734245314:web:2c025f1fa17e0acd2dc65b",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
