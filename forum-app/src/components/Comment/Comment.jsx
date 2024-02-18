import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { deleteComment, updateComment } from "../../services/comment.service";
import "./Comment.css";


const Comment = ({ commentId, commentData, postId, post, setPost }) => {
    const { userData } = useContext(AuthContext);

    const [onEdit, setOnEdit] = useState(false);
    const [commentContent, setCommentContent] = useState(commentData.content);

    const onDelete = async () => {
        try {
            await deleteComment(postId, commentId);
        } catch (e) {
            console.log(e.message);
        } finally {
            delete post.comments[commentId];
            setPost({ ...post });
        }
    };

    const editComment = async () => {
        try {
            await updateComment(postId, commentId, commentContent);
        } catch (e) {
            console.log(e.message);
        } finally {
            post.comments[commentId].content = commentContent;
            setPost({ ...post });
        }
    }

    if (onEdit) {
        return (
            <div>
                <input
                    type="text"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    onBlur={() => setOnEdit(false)}
                />
                <button onClick={() => {
                    editComment();
                    setOnEdit(false);
                }}>Comment</button>
            </div>
        );
    } else {
        return (
            <div className="comment">
                <div>
                    <h4>{commentData.author}</h4>
                    <p>{commentData.content}</p>
                </div>
                {userData && userData.username === commentData.author && <button onClick={() => setOnEdit(true)}>Edit</button>}
                {userData && (userData.username === commentData.author || userData.role === 'admin') && <button onClick={onDelete}>Delete</button>}
            </div>
        );
    }


};

Comment.propTypes = {
    commentId: PropTypes.string.isRequired,
    commentData: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    setPost: PropTypes.func.isRequired
};

export default Comment;