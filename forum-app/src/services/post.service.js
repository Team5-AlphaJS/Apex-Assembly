import {
    ref,
    push,
    get,
    set,
    update,
    remove
} from 'firebase/database';

import { db } from '../config/firebase-config'; 

/**
 * Retrieves all posts from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of posts.
 */
export const getAllPosts = async () => {
    return get(ref(db, 'posts'));
}

/**
 * Retrieves a post from the database.
 * @param {string} postId - The ID of the post to retrieve.
 * @returns {Promise} - A promise that resolves with the retrieved post.
 */
export const getPost = async (postId) => {
    return get(ref(db, `posts/${postId}`))
}

/**
 * Retrieves posts by author from the database.
 * @param {string} author - The author's name.
 * @returns {Promise<Array<Object>>} - An array of posts by the specified author.
 */
export const getPostsByAuthor = async (author) => {
    const snapshot = await get(ref(db, 'posts'));
    return Object.entries(snapshot.val() || {})
        .filter(([key, post]) => post.author === author)
        .map(([key, post]) => ({ id: key, ...post }));
};

/**
 * Deletes a post from the database.
 * 
 * @param {string} postId - The ID of the post to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the post is successfully deleted.
 */
export const deletePost = async (postId) => {
  await remove(ref(db, `posts/${postId}`));
};

/**
 * Uploads a post to the database.
 * @param {Object} post - The post object to be uploaded.
 * @returns {Promise} - A promise that resolves when the post is successfully uploaded.
 */
export const uploadPost = async (post) => {
    return push(ref(db, 'posts'), {
        ...post,
        createdOn: Date.now()
    });
}

/**
 * Updates a specific property of a post in the database.
 * 
 * @param {string} postId - The ID of the post to be updated.
 * @param {string} key - The key of the property to be updated.
 * @param {any} value - The new value of the property.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
export const changePost = async (postId, key, value) => {
    const path = `posts/${postId}/${key}`;
    return update(ref(db), { [path]: value })
}

/**
 * Retrieves the liked posts of a user.
 * @param {string} username - The username of the user.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of liked posts.
 * @throws {Error} - If the user does not exist.
 */
export const getLikedPosts = async (username) => {
    const snapshot = await get(ref(db, `users/${username}`));
    if (!snapshot.val()) {
        throw new Error(`User with username: ${username} does not exist!`);
    }

    const user = snapshot.val();
    if (!user.likedPosts) return [];

    const likedPosts = await Promise.all(Object.keys(user.likedPosts).map(async (key) => {
        const postSnapshot = await get(ref(db, `posts/${key}`));
        const post = postSnapshot?.val();
        if (post === null) {
            return null;
        }
        return {
            ...post,
            createdOn: new Date(post?.createdOn),
            id: key,
            likes: post?.likes ? Object.keys(post?.likes) : [],
        };
    }));

    return likedPosts;
};

/**
 * Updates the liked status of a post.
 * 
 * @param {string} userId - The ID of the user.
 * @param {string} postId - The ID of the post.
 * @param {boolean} liked - The new liked status of the post.
 * @returns {Promise<Object>} - A promise that resolves to the updated post data.
 */
export const updatePostLikedStatus = async (userId, postId, liked) => {
    const postSnapshot = await get(ref(db, `posts/${postId}`));
    if (postSnapshot.exists()) {
        const postData = postSnapshot.val();
        const updatedLikes = { ...postData.likes };
        if (liked) {
            updatedLikes[userId] = true;
        } else {
            delete updatedLikes[userId];
        }
        postData['likes'] = updatedLikes;
        await set(ref(db, `posts/${postId}/likes`), updatedLikes);
        return postData;
    }
};
