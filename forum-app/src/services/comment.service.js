import { ref, update } from 'firebase/database';
import { db } from '../config/firebase-config';

/**
 * Uploads a comment to a specific post.
 * 
 * @param {string} postId - The ID of the post.
 * @param {string} commentId - The ID of the comment.
 * @param {object} commentData - The data of the comment.
 * @returns {Promise<void>} A promise that resolves when the comment is uploaded.
 */
export const uploadComment = async (postId, commentId, commentData) => {
    const path = `posts/${postId}/comments/${commentId}`;

    return update(ref(db), { [path]: commentData });
};

/**
 * Deletes a comment from a post.
 * 
 * @param {string} postId - The ID of the post.
 * @param {string} commentId - The ID of the comment.
 * @returns {Promise<void>} A promise that resolves when the comment is deleted.
 */
export const deleteComment = async (postId, commentId) => {
    const path = `posts/${postId}/comments/${commentId}`;

    return update(ref(db), { [path]: null });
};


/**
 * Updates the content of a comment.
 * 
 * @param {string} postId - The ID of the post containing the comment.
 * @param {string} commentId - The ID of the comment to be updated.
 * @param {string} newContent - The new content of the comment.
 * @returns {Promise<void>} - A promise that resolves when the comment is successfully updated.
 */
export const updateComment = async (postId, commentId, newContent) => {
    const path = `posts/${postId}/comments/${commentId}/content`;

    return update(ref(db), { [path]: newContent });
};