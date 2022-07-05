import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDCR6fU9ddoLh6BjHSk6wSIGaJfG-2TTdw',
  authDomain: 'splash-by-noor.firebaseapp.com',
  projectId: 'splash-by-noor',
  storageBucket: 'splash-by-noor.appspot.com',
  messagingSenderId: '449017702943',
  appId: '1:449017702943:web:96d0aeda6c337de11ac32a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app, 'gs://splash-by-noor.appspot.com/');

export { app, db, storage };
