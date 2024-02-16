import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
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

export const editUser = (data) => {
  return update(ref(db, `users/${data.username}`), data);
}

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const getAllUsersData = async () => {
  const snapshot = await get(ref(db, 'users'));
  if (snapshot.exists()) {
      const usersData = snapshot.val();
      return Object.keys(usersData).map(userId => ({ id: userId, ...usersData[userId] }));
  }
  return [];
};

export const handleToggleRole = async (userId, newRole) => {
    try {
        await update(ref(db, `users/${userId}`), { role: newRole });
    } catch (error) {
        console.error('Error updating user role:', error);
    }
};