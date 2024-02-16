import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Button, Image, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { deletePost } from '../../services/post.service';

const SimplePost = ({ postId, postData, posts, setPosts }) => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      setPosts(posts.filter(post => post[0] !== postId));
      onClose();
      navigate('/');
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

  return (
    <div id={postId}>
      <h3><b>{postData.title}</b></h3>
      {postData?.imgUrl && <Image src={postData?.imgUrl} alt='Post Photo' />}
      <p>{postData.content}</p>
      <p>Category: {postData.category}</p>
      <p>Posted on: {new Date(postData.createdOn).toLocaleDateString()}</p>
      <p>Posted by: {postData.author}</p>
      {userData && <button>Like</button>}
      {/* {userData && <button>Comment</button>} Move to Single view*/}
      <button onClick={() => navigate(`post/${postId}`)}>More</button>
      {userData && userData.username === postData.author && <Button ml={'5px'} size={'sm'} variant='ghost' color='black' bg='orange.300' onClick={() => navigate(`/edit-post/${postId}`)}>Edit</Button>}
      {userData && (userData.username === postData.author || userData.role === 'admin') &&
        <>
          <Button ml={'5px'} size={'sm'} variant='ghost' color='black' bg='orange.300' onClick={onOpen}>Delete</Button>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader p='15px' m='15px' textAlign='center'>Are you sure you want to delete this post?</ModalHeader>
              <ModalCloseButton />

              <ModalFooter>
                <Button bg='green.400' color='white' mr={3} onClick={onClose}>
                  No
                </Button>
                <Button variant='ghost' color='white' bg='red.400' onClick={() => onSubmitDelete(postId)}>Yes</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>}
      <br /><br />
    </div>
  )
}

SimplePost.propTypes = {
  postId: PropTypes.string.isRequired,
  postData: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired
}

export default SimplePost;