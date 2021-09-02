import firebase from "firebase/app";
import firestore from "firebase/firestore";

const firebaseConfig = {
    apiKey: ,
    authDomain: ,
    projectId: ,
    storageBucket: ,
    messagingSenderId: ,
    appId: 
};
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();