import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../services/post.service";
import { changePost } from "../services/post.service";
import CreateEditPost from "../components/CreateEditPost.jsx/CreateEditPost";

const EditPost = () => {
    const postId = useParams().id;

    const [origPost, setOrigPost] = useState({});
    const [post, setPost] = useState({
        title: '',
        content: '',
        category: '',
        imgUrl: '',
    });

    useEffect(() => {
        getPost(postId).then(currPost => {
            setOrigPost(currPost.val());
            setPost(currPost.val());
        });
    }, [postId]);

    const onEdit = async () => {
        if (post.title !== origPost.title) {
            await changePost(postId, 'title', post.title)
        }

        if (post.content !== origPost.content) {
            await changePost(postId, 'content', post.content);
        }

        if (post.category !== origPost.category) {
            await changePost(postId, 'category', post.category);
        }

        if (post.imgUrl !== origPost.imgUrl) {
            await changePost(postId, 'imgUrl', post.imgUrl);
        }
        // await changePost(postId, 'createdOn', Date.now()); under question for that
    };

    return (
        <CreateEditPost post={post} setPost={setPost} requestFunc={onEdit} onEdit={true} />
    )
};

export default EditPost;