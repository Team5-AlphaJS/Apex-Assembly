import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../services/post.service";
import { changePost } from "../services/post.service";
import CreateEditPost from "../components/CreateEditPost.jsx/CreateEditPost";

/**
 * Renders a component for editing a post.
 *
 * @returns {JSX.Element} The EditPost component.
 */
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

    /**
     * Handles the edit operation for a post.
     * If any changes are made to the post's title, content, category, or image URL,
     * the corresponding fields will be updated using the changePost function.
     */
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
    };

    return (
        <CreateEditPost post={post} setPost={setPost} requestFunc={onEdit} onEdit={true} />
    )
};

export default EditPost;