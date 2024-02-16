import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getPost } from "../services/post.service";

const Post = () => {
    const { userData } = useContext(AuthContext);
    const postId = useParams().id;

    const [post, setPost] = useState({});
    const [toComment, setToComment] = useState(false);

    useEffect(() => {
        getPost(postId).then(post => setPost(post.val()));
    }, [postId]);

    return (
        <div>
            <img src={post.imgUrl} />
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>Posted on: {new Date(post.createdOn).toLocaleDateString()}</p>
            <button>Like</button>
            {userData && (userData.username === post.author) && <button>Edit</button>}
            {userData && (userData.username === post.author || userData.role === 'admin') && <button>Delete</button>}

            <button onClick={() => setToComment(true)}>Comment</button>
            {toComment && (
                <div>
                    <textarea></textarea>
                    <button onClick={() => setToComment(false)}>Comment</button>
                </div>
            )}
            {post.comments ? <p>Some Comment</p> : <p>No comments yet</p>}
        </div>
    );
};

export default Post;

// author: "Alex"
// category: "cars"
// content: "The AMR24 got shown to the public today with literally the same livery as last year. But at least it has some paint on it and not a big amount of exposed carbon."
// createdOn: 1707756356113
// imgUrl: "https://cdn-5.motorsport.com/images/amp/2QzqMpAY/s1000/aston-martin-amr24.jpg"
// title: "The new Aston Martin challenger unveiled for the 2024 season"