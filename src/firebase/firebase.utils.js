import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBlNfBazddmJbVddByzwV1O8jkGFXZ2Z8U",
  authDomain: "crwn-db-ownspark.firebaseapp.com",
  databaseURL: "https://crwn-db-ownspark.firebaseio.com",
  projectId: "crwn-db-ownspark",
  storageBucket: "crwn-db-ownspark.appspot.com",
  messagingSenderId: "177908841600",
  appId: "1:177908841600:web:2af4359ef2c08f7a12fa65",
  measurementId: "G-2ED392MBCM"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
