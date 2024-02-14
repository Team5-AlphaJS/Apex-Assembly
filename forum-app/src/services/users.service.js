import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getAllUsers = async () => {
  const snapshot = await get(ref(db, 'users'));
  return snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
};

export const getUserByUsername = (username) => {
  return get(ref(db, `users/${username}`));
};

export const createUserHandle = (username, uid, email, role) => {
  return set(ref(db, `users/${username}`), {
      uid,
      email,
      username,
      role,
      createdOn: Date.now(),
      firstName: '',
      lastName: '',
      posts: {},
      // we can use the url of an image to set it as an avatar
      avatarUrl: '',
  });
}

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};