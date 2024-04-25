import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpWqEmVsAOnluicIQUVl7B5QQifimvYmU",
  authDomain: "formula1-forum-app.firebaseapp.com",
  projectId: "formula1-forum-app",
  storageBucket: "formula1-forum-app.appspot.com",
  messagingSenderId: "296858060742",
  appId: "1:296858060742:web:1c577e28b8514d1d95d4c7",
  databaseURL: "https://formula1-forum-app-default-rtdb.europe-west1.firebasedatabase.app/"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);