import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const SimplePost = ({ postId, postData }) => {
    const { userData } = useContext(AuthContext);

    return (
        <div id={postId}>
            <h3><b>{postData.title}</b></h3>
            <p>{postData.description}</p>
            <p>{postData.createdOn}</p>
            <p>{postData.author}</p>
            {userData && <button>Like</button>}
            {/* {userData && <button>Comment</button>} Move to Single view*/}
            <button>More</button>
            {userData.username === postData.author && <button>Edit</button>}
            {userData.username === postData.author || userData.role === 'admin' && <button>Delete</button>}


        </div>
    )
}

SimplePost.propTypes = {
    postId: PropTypes.string.isRequired,
    postData: PropTypes.object.isRequired,
}

export default SimplePost;