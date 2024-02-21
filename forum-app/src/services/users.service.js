import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';

/**
 * Retrieves the total number of users from the database.
 * @returns {Promise<number>} The total number of users.
 */
export const getAllUsers = async () => {
  const snapshot = await get(ref(db, 'users'));
  return snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
};

/**
 * Retrieves a user by their username.
 *
 * @param {string} username - The username of the user to retrieve.
 * @returns {Promise<object>} A promise that resolves to the user object.
 */
export const getUserByUsername = (username) => {
  return get(ref(db, `users/${username}`));
};

/**
 * Creates a user handle in the database.
 * 
 * @param {string} username - The username of the user.
 * @param {string} uid - The unique identifier of the user.
 * @param {string} email - The email address of the user.
 * @param {string} role - The role of the user.
 * @returns {Promise} A promise that resolves when the user handle is created in the database.
 */
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

/**
 * Updates the user information in the database.
 * 
 * @param {Object} data - The user data to be updated.
 * @returns {Promise} A promise that resolves when the user is successfully updated.
 */
export const editUser = (data) => {
  return update(ref(db, `users/${data.username}`), data);
}

/**
 * Retrieves user data based on the provided user ID.
 *
 * @param {string} uid - The user ID to retrieve data for.
 * @returns {Promise} A promise that resolves with the user data.
 */
export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

/**
 * Retrieves all users' data from the database.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
 */
export const getAllUsersData = async () => {
  const snapshot = await get(ref(db, 'users'));
  if (snapshot.exists()) {
      const usersData = snapshot.val();
      return Object.keys(usersData).map(userId => ({ id: userId, ...usersData[userId] }));
  }
  return [];
};

/**
 * Handles toggling the role of a user.
 * @param {string} userId - The ID of the user.
 * @param {string} newRole - The new role to assign to the user.
 * @returns {Promise<void>} - A promise that resolves when the user role is updated successfully.
 */
export const handleToggleRole = async (userId, newRole) => {
    try {
        await update(ref(db, `users/${userId}`), { role: newRole });
    } catch (error) {
        console.error('Error updating user role:', error);
    }
};

/**
 * Updates the liked posts of a user in the database.
 * 
 * @param {string} userId - The ID of the user.
 * @param {string} postId - The ID of the post.
 * @param {boolean} liked - Indicates whether the post is liked or not.
 * @returns {Object|null} - The updated user data or null if the user does not exist.
 */
export const updateUserLikedPosts = async (userId, postId, liked) => {
  try {
    const userDataSnapshot = await getUserData(userId);
    if (userDataSnapshot.exists()) {
      const userData = userDataSnapshot.val();
      const userKey = Object.keys(userData)[0];
      const userDataForPost = userData[userKey];
      if (liked) {
        userDataForPost.likedPosts = { ...userDataForPost.likedPosts, [postId]: liked };
      } else {
        delete userDataForPost.likedPosts[postId];
      }
      await set(ref(db, `users/${userDataForPost.username}`), userDataForPost);
      return userDataForPost;
    }
  } catch (error) {
    console.error('Error updating user liked posts:', error);
  }
  return null;
};
