import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config= {
    apiKey: "AIzaSyCARQSS6ix6aysXTmc1bfO0rSCPr2lWhuk",
    authDomain: "crown-db-4e440.firebaseapp.com",
    databaseURL: "https://crown-db-4e440.firebaseio.com",
    projectId: "crown-db-4e440",
    storageBucket: "crown-db-4e440.appspot.com",
    messagingSenderId: "482538347186",
    appId: "1:482538347186:web:e637d8dc081fc866fe87ab"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore= firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;