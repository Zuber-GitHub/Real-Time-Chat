import firebase from 'firebase';
import 'firebase/storage'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAyqTVSqSS2P0SzDGf7cIUyV5h7BP4TeOg",
  authDomain: "chatz-c77a2.firebaseapp.com",
  projectId: "chatz-c77a2",
  storageBucket: "chatz-c77a2.appspot.com",
  messagingSenderId: "718981909484",
  appId: "1:718981909484:web:2ffeb373614af062554ec9",
  measurementId: "G-GVRLRZTYV1"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()
console.log(auth)

export const storage = firebase.storage()

export { db, auth }