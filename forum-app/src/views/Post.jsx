import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SimplePost from "../components/SimplePost/SimplePost";
import { AuthContext } from "../context/AuthContext";
import { uploadComment } from "../services/comment.service";
import { deletePost, getPost } from "../services/post.service";
import { v4 } from "uuid";
import Comment from "../components/Comment/Comment";
import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";

const Post = () => {
    const { userData } = useContext(AuthContext);
    const postId = useParams().id;
    const [post, setPost] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    const navigate = useNavigate();
    const toast = useToast();

    const [toComment, setToComment] = useState(false);
    const [commentData, setCommentData] = useState('');

    const sortComments = () => {
        return Object.entries(post.comments)
            .sort((a, b) => b[1].createdOn - a[1].createdOn);
    };

    useEffect(() => {
        getPost(postId).then(post => setPost(post.val()));
    }, [postId]);

    const onSubmitDelete = async () => {
        try {
          await deletePost(postId);
          toast({
            title: 'Post deleted successfully.',
            status: 'success',
            position: 'top',
            duration: 5000,
            isClosable: true,
          });
          onClose();
          navigate(-1);
        } catch (error) {
          toast({
            title: 'An error occurred.',
            description: 'Failed to delete post.',
            status: 'error',
            position: 'top',
            duration: 5000,
            isClosable: true,
          });
        }
      };


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

            {userData && userData.username === post.author && (
                <Button
                    ml={'5px'}
                    size={'sm'}
                    variant="ghost"
                    color="black"
                    bg="orange.300"
                    onClick={() => navigate(`/edit-post/${postId}`)}
                >
                    Edit
                </Button>
            )}
            {userData &&
                (userData.username === post.author ||
                    userData.role === 'admin') && (
                    <>
                        <Button
                            ml={'5px'}
                            size={'sm'}
                            variant="ghost"
                            color="black"
                            bg="orange.300"
                            onClick={onOpen}
                        >
                            Delete
                        </Button>
                        <Modal isOpen={isOpen} onClose={onClose} isCentered>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader p="15px" m="15px" textAlign="center">
                                    Are you sure you want to delete this post?
                                </ModalHeader>
                                <ModalCloseButton />

                                <ModalFooter>
                                    <Button bg="green.400" color="white" mr={3} onClick={onClose}>
                                        No
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        color="white"
                                        bg="red.400"
                                        onClick={() => onSubmitDelete(postId)}
                                    >
                                        Yes
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>
                )}

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
