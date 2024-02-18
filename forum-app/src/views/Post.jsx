import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimplePost from "../components/SimplePost/SimplePost";
import { AuthContext } from "../context/AuthContext";
import { uploadComment } from "../services/comment.service";
import { getPost } from "../services/post.service";
import { v4 } from "uuid";
import Comment from "../components/Comment/Comment";

const Post = () => {
    const { userData } = useContext(AuthContext);
    const postId = useParams().id;
    const [post, setPost] = useState({});

    const [toComment, setToComment] = useState(false);
    const [commentData, setCommentData] = useState('');

    const sortComments = () => {
        return Object.entries(post.comments)
            .sort((a, b) => b[1].createdOn - a[1].createdOn);
    };

    useEffect(() => {
        getPost(postId).then(post => setPost(post.val()));
    }, [postId]);



    const onComment = async () => {
        const comment = {
            author: userData.username,
            content: commentData,
            createdOn: Date.now()
        };
        const id = v4();
        try {
            await uploadComment(postId, id, comment);
        } catch (e) {
            console.log(e.message);
        } finally {
            if ('comments' in post) {
                console.log('Has comments');
                post.comments[id] = comment;
                setPost({ ...post });
            } else {
                console.log('Does not have comments');
                post['comments'] = {};
                post.comments[id] = comment;
                setPost({ ...post });
            }
        }
    }

    return (
        <div>
            <SimplePost postId={postId} postData={post} />


            {userData && userData?.role !== 'blocked' ? (
                <div>
                    <input
                        type="text"
                        placeholder="Write your comment..."
                        value={commentData}
                        onChange={(e) => setCommentData(e.target.value)}
                        onFocus={() => setToComment(true)} />
                    {toComment && <button onClick={() => {
                        onComment();
                        setToComment(false);
                        setCommentData('');
                    }}>Comment</button>}
                </div>
            ) : (
                <p>You are not allowed to comment!</p>
            )}


            {'comments' in post && Object.keys(post.comments).length
                ? (sortComments().map(comment => <Comment key={comment[0]} commentId={comment[0]} commentData={comment[1]} postId={postId} post={post} setPost={setPost} />))
                : <p>No comments yet</p>}
        </div>
    );
};

export default Post;
