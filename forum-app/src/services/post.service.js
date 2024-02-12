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

export const getAllPosts = () => {
    return get(ref(db, 'posts'));
}


export const uploadPost = (post) => {
    return push(ref(db, 'posts'), {
        ...post,
        createdOn: Date.now()
    });
}