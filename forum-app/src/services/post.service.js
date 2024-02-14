import {
    ref,
    push,
    get,
    set,
    update,
    query,
    equalTo,
    orderByChild,
    orderByKey
} from 'firebase/database';

import { db } from '../config/firebase-config'; 

export const getAllPosts = async () => {
    return get(ref(db, 'posts'));
}

export const getPost = async (postId) => {
    return get(ref(db, `posts/${postId}`))
}


export const uploadPost = async (post) => {
    return push(ref(db, 'posts'), {
        ...post,
        createdOn: Date.now()
    });
}

export const changePost = async (postId, key, value) => {
    const path = `posts/${postId}/${key}`;
    return update(ref(db), { [path]: value })
}