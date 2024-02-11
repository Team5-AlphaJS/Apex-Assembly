// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpWqEmVsAOnluicIQUVl7B5QQifimvYmU",
  authDomain: "formula1-forum-app.firebaseapp.com",
  projectId: "formula1-forum-app",
  storageBucket: "formula1-forum-app.appspot.com",
  messagingSenderId: "296858060742",
  appId: "1:296858060742:web:1c577e28b8514d1d95d4c7",
  databaseURL: "https://formula1-forum-app-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);