import firebase from "firebase/app";
import firestore from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDB-M8vgSBtiXIVkGoZ3NS6E2Smg0HXPSE",
    authDomain: "questionnaire-26be8.firebaseapp.com",
    projectId: "questionnaire-26be8",
    storageBucket: "questionnaire-26be8.appspot.com",
    messagingSenderId: "653184327490",
    appId: "1:653184327490:web:0ddb1cc59e0805eca1f2db"
};
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();