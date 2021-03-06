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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

 return await batch.commit()
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
  return transformedCollection.reduce((acc, collection)  => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
}

export const getCurrentUser = () => {
  return new Promise((res, rej) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      res(userAuth);
    }, rej)
  });
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore= firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;