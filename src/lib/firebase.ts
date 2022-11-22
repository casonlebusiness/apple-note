import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

export const firebaseConfig = {
  // your config
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "apple-note.firebaseapp.com",
  projectId: "apple-note",
  storageBucket: "apple-note.appspot.com",
  messagingSenderId: "262747200533",
  appId: "1:262747200533:web:10e3f34cacb68f3dc0021c",
  measurementId: "G-TN80MJTQGDgit"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const storage = firebase.storage();
const firestore = firebase.firestore();
if (process.env.NEXT_PUBLIC_ENV_MODE === 'LOCAL') {
  firestore.useEmulator('localhost', parseInt(process.env.NEXT_PUBLIC_FIREBASE_EMULATOR));
}
export { firestore };
