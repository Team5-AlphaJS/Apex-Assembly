import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { deletePost, updatePostLikedStatus } from '../../services/post.service';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { updateUserLikedPosts } from '../../services/users.service';
import { FiUser } from 'react-icons/fi';

const SimplePost = ({ updateUserData, postId, postData, posts, setPosts }) => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [like, setLike] = useState(true);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

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
      setPosts(posts.filter((post) => post[0] !== postId));
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

  const likeHandle = async () => {
    setLike(!like);

    if (userData && userData.uid) {
      try {
        const currentUserId = userData.uid;
        await updateUserLikedPosts(currentUserId, postId, like).then((data) => {
          updateUserData(data);
        });
        await updatePostLikedStatus(currentUserId, postId, like).then(
          (updatedPostData) => {
            setPosts(
              posts.map((post) =>
                post.id === updatedPostData.id ? [...updatedPostData] : post
              )
            );
          }
        );
      } catch (e) {
        console.error(e.message);
      }
    }
  };

  useEffect(() => {
    if (userData?.likedPosts && userData.likedPosts[postId] !== undefined) {
      setLike(!userData.likedPosts[postId]);
    } else {
      setLike(true);
    }
  }, [userData]);

  return (
    <Card key={postId} maxW="md" p={4} boxShadow="md" borderRadius="md" mb={5}>
      <CardHeader>
        <Flex flex="1" alignItems="center" flexWrap="wrap">
          {/* <Link to={`/user/${postData?.author}`}>
              {postData.author && userData && (
                <Avatar
                  name={userData?.username}
                  src={userData?.avatarUrl || FiUser}
                  as="button"
                />
              )}
              {!postData.author && (
                <Avatar as="button">
                  <FiUser />
                </Avatar>
              )}
            </Link> */}
          <Box>
            <Heading size="sm">From: {postData?.author}</Heading>
            <Text fontWeight="semibold" fontSize="xs" letterSpacing="wide">
              Created on:{' '}
              {userData &&
                new Date(userData?.createdOn).toLocaleDateString(
                  'en-US',
                  options
                )}
            </Text>
            <Text fontWeight="semibold" fontSize="xs" letterSpacing="wide">
              Category: {postData.category}
            </Text>
          </Box>
        </Flex>
      </CardHeader>

      <CardBody pt={0}>
        <Heading
          size="sm"
          px="15px"
          pb="15px"
          pt="10px"
          align={'center'}
        >
          {postData?.title}
        </Heading>
        <Text fontWeight="medium" noOfLines={[1, 2, 3]}>
          {postData?.content}...
        </Text>
      </CardBody>

      {postData?.imgUrl && (
        <Image objectFit="cover" src={postData?.imgUrl} alt="post photo" />
      )}

      <CardFooter justify="space-between" flexWrap="wrap">
        {userData && (
          <Button
            variant="ghost"
            _hover={{ borderColor: 'orange.200' }}
            onClick={likeHandle}
            colorScheme={like ? 'blue' : 'orange'}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {like ? <FaThumbsUp /> : <FaThumbsDown />}
              <span style={{ marginLeft: '0.5rem' }}>
                {like ? 'Like' : 'Liked'}
              </span>
            </span>
          </Button>
        )}
        <Button
          bg={'orange.300'}
          color={'black'}
          onClick={() => navigate(`post/${postId}`)}
        >
          Read more
        </Button>
      </CardFooter>

      {/* {userData && userData.username === postData.author && (
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
        (userData.username === postData.author ||
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
        )} */}
    </Card>
  );
};

SimplePost.propTypes = {
  updateUserData: PropTypes.func,
  postId: PropTypes.string,
  postData: PropTypes.object,
  posts: PropTypes.array,
  setPosts: PropTypes.func,
};

export default SimplePost;
