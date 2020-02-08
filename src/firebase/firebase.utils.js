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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user ', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore= firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;