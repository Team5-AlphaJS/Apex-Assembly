import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import SimplePost from '../components/SimplePost/SimplePost';
import { AuthContext } from '../context/AuthContext';
import { uploadComment } from '../services/comment.service';
import {
  deletePost,
  getPost,
  updatePostLikedStatus,
} from '../services/post.service';
import { v4 } from 'uuid';
import Comment from '../components/Comment/Comment';
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
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import {
  getUserByUsername,
  updateUserLikedPosts,
} from '../services/users.service';
import PropTypes from 'prop-types';

const Post = ({ updateUserData }) => {
  const { userData } = useContext(AuthContext);
  const postId = useParams().id;
  const [post, setPost] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const [toComment, setToComment] = useState(false);
  const [commentData, setCommentData] = useState('');
  const [like, setLike] = useState(true);
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [authorUid, setAuthorUid] = useState('');
  const [likesCount, setLikesCount] = useState(0);
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  useEffect(() => {
    const fetchAuthorData = async () => {
      const userSnapshot = await getUserByUsername(post?.author);
      const avatarUrl = userSnapshot.val()?.avatarUrl;
      const authorUid = userSnapshot.val()?.uid;
      setAuthorAvatar(avatarUrl);
      setAuthorUid(authorUid);
    };
    fetchAuthorData();
  }, [post?.author]);

  const sortComments = () => {
    return Object.entries(post.comments).sort(
      (a, b) => b[1].createdOn - a[1].createdOn
    );
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(postId);
        const fetchedPostData = fetchedPost.val();
        setPost(fetchedPostData);
        setLikesCount(Object.keys(fetchedPostData?.likes).length);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPost();
  }, [postId]);

  const likeHandle = async () => {
    const updatedLike = !like;

    if (userData && userData.uid) {
      try {
        const currentUserId = userData.uid;
        await updateUserLikedPosts(currentUserId, postId, like).then((data) => {
          updateUserData(data);
        });
        await updatePostLikedStatus(currentUserId, postId, like).then(
          (data) => {
            setPost(data);
          }
        );
        setLike(updatedLike);
        const newLikesCount = like ? likesCount + 1 : likesCount - 1;
        setLikesCount(newLikesCount);
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
      createdOn: Date.now(),
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
  };

  return (
    <Box>
      <Flex justifyContent="center">
        <Card
          key={postId}
          maxW={'95%'}
          p={4}
          boxShadow="md"
          borderRadius="md"
          mb={5}
        >
          <CardHeader>
            <Flex alignItems="center" flexWrap="wrap">
              <Link to={`/user/${authorUid}`}>
                {post && post?.author && (
                  <Avatar
                    size={'lg'}
                    mr={2}
                    name={post?.author}
                    src={authorAvatar || <FiUser />}
                    as="button"
                  />
                )}
                {!post ||
                  (!post.author && (
                    <Avatar>
                      <FiUser />
                    </Avatar>
                  ))}
              </Link>
              <Heading size="sm">From: {post?.author}</Heading>
              <Spacer />
              {post && (
                <Heading fontSize="md" letterSpacing="wide">
                  Category: {post?.category}
                </Heading>
              )}
            </Flex>
          </CardHeader>

          <CardBody pt={0}>
            <Heading size="xl" align={'center'} pb={2}>
              {post?.title}
            </Heading>
            <Text
              fontWeight="semibold"
              fontSize="md"
              letterSpacing="wide"
              align={'center'}
            >
              Created on: {new Date(post?.createdOn).toLocaleString()}
            </Text>
          </CardBody>

          {post?.imgUrl && (
            <Image
              objectFit="cover"
              src={post?.imgUrl}
              alt="post photo"
              mb={4}
            />
          )}

          <Text fontSize={'20px'} fontWeight="medium" textAlign={'justify'}>
            {post?.content}
          </Text>

          <CardFooter justify="left">
            {userData && (
              <>
                <Button
                  variant="ghost"
                  _hover={{ borderColor: 'orange.200' }}
                  onClick={likeHandle}
                  colorScheme={like ? 'blue' : 'orange'}
                >
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {like ? <FaThumbsUp /> : <FaThumbsDown />}
                    <span style={{ marginLeft: '0.5rem' }}>
                      {like ? 'Like' : 'Unlike'}
                    </span>
                  </span>
                </Button>
              </>
            )}
            <Text color="gray.500" mt={2}>
              Likes: {likesCount}
            </Text>
            <Spacer />
            {userData && post && userData?.username === post?.author && (
              <Button
                size={'md'}
                variant="ghost"
                color="black"
                bg="orange.300"
                onClick={() => navigate(`/edit-post/${postId}`)}
              >
                Edit Post
              </Button>
            )}
            {userData &&
              (userData?.username === (post && post?.author) ||
                userData?.role === 'admin') && (
                <>
                  <Button
                    ml={'10px'}
                    size={'md'}
                    variant="ghost"
                    color="black"
                    bg="orange.300"
                    onClick={onOpen}
                  >
                    Delete Post
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader p="15px" m="15px" textAlign="center">
                        Are you sure you want to delete this post?
                      </ModalHeader>
                      <ModalCloseButton />

                      <ModalFooter>
                        <Button
                          bg="green.400"
                          color="white"
                          mr={3}
                          onClick={onClose}
                        >
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
          </CardFooter>
        </Card>
      </Flex>

      {userData && userData?.role !== 'blocked' ? (
        <Flex
          p={3}
          rounded={'lg'}
          alignItems="center"
          minW={'500px'}
          maxW={'1000px'}
          ml={'37.5px'}
          mb={'20px'}
          bgColor={isDarkMode ? 'gray.700' : 'gray.100'}
        >
          <Avatar mr={2} name={post?.author} src={authorAvatar || <FiUser />} />
          <Input
            type="text"
            placeholder="Write your comment..."
            w={'800px'}
            focusBorderColor="orange.300"
            value={commentData}
            onChange={(e) => setCommentData(e.target.value)}
            onFocus={() => setToComment(true)}
          />
          {toComment && (
            <>
              <Spacer />
              <Button
                _hover={{ borderColor: 'orange.300' }}
                onClick={() => {
                  onComment();
                  setToComment(false);
                  setCommentData('');
                }}
              >
                Comment
              </Button>
            </>
          )}
        </Flex>
      ) : (
        <p>You are not allowed to comment!</p>
      )}

      {post && 'comments' in post && Object.keys(post.comments).length ? (
        sortComments().map((comment) => (
          <Comment
            key={comment[0]}
            commentId={comment[0]}
            commentData={comment[1]}
            postId={postId}
            post={post}
            setPost={setPost}
          />
        ))
      ) : (
        <Text textAlign={'center'} ml={'37.5px'} mb={'20px'}>
          No comments.
        </Text>
      )}
    </Box>
  );
};

Post.propTypes = {
  updateUserData: PropTypes.func,
};

export default Post;
