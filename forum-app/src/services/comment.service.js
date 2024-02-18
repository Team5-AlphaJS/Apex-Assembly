import { ref, update } from 'firebase/database';
import { db } from '../config/firebase-config';

export const uploadComment = async (postId, commentId, commentData) => {
    const path = `posts/${postId}/comments/${commentId}`;

    return update(ref(db), { [path]: commentData });
};

export const deleteComment = async (postId, commentId) => {
    const path = `posts/${postId}/comments/${commentId}`;

    return update(ref(db), { [path]: null });
};


export const updateComment = async (postId, commentId, newContent) => {
    const path = `posts/${postId}/comments/${commentId}/content`;

    return update(ref(db), { [path]: newContent });
};