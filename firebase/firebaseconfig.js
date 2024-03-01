import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence, browserLocalPersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyC_SpI1LtDOAa1A1AFk_A7teBgt1jplR0g",
  authDomain: "moneypal-78677.firebaseapp.com",
  projectId: "moneypal-78677",
  storageBucket: "moneypal-78677.appspot.com",
  messagingSenderId: "446258025611",
  appId: "1:446258025611:web:c5e28d0f6a517fb15f308e"
};


// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP);
export const FIREBASE_PROVIDER = new GoogleAuthProvider();

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage, browserLocalPersistence)
});
