import {
    ref,
    push,
    get,
    set,
    update,
    query,
    equalTo,
    orderByChild,
    orderByKey,
    remove
} from 'firebase/database';

import { db } from '../config/firebase-config'; 

export const getAllPosts = async () => {
    return get(ref(db, 'posts'));
}

export const getPost = async (postId) => {
    return get(ref(db, `posts/${postId}`))
}

export const getPostsByAuthor = async (author) => {
    const snapshot = await get(ref(db, 'posts'));
    return Object.entries(snapshot.val() || {})
        .filter(([key, post]) => post.author === author)
        .map(([key, post]) => ({ id: key, ...post }));
};

export const deletePost = async (postId) => {
  await remove(ref(db, `posts/${postId}`));
};

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
