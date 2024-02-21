import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  Text,
} from '@chakra-ui/react';
import { updatePostLikedStatus } from '../../services/post.service';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import {
  getUserByUsername,
  updateUserLikedPosts,
} from '../../services/users.service';
import { FiUser } from 'react-icons/fi';

const SimplePost = ({ updateUserData, postId, postData, posts, setPosts }) => {
  const { userData } = useContext(AuthContext);
  const [like, setLike] = useState(true);
  const [likesCount, setLikesCount] = useState(postData.likes ? Object.keys(postData?.likes).length  : 0)

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [authorUid, setAuthorUid] = useState('');

  useEffect(() => {
    const fetchAuthorData = async () => {
      const userSnapshot = await getUserByUsername(postData?.author);
      const avatarUrl = userSnapshot.val()?.avatarUrl;
      const authorUid = userSnapshot.val()?.uid;
      setAuthorAvatar(avatarUrl);
      setAuthorUid(authorUid);
    };
    fetchAuthorData();
  }, [postData?.author]);

  const likeHandle = async () => {
    setLike(!like);

    const newLikesCount = like ? likesCount + 1 : likesCount - 1;
    setLikesCount(newLikesCount);

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
          <Link to={`/user/${authorUid}`}>
            {postData.author && (
              <Avatar
                mr={2}
                name={postData?.author}
                src={authorAvatar || <FiUser />}
                as="button"
              />
            )}
            {!postData.author && (
              <Avatar>
                <FiUser />
              </Avatar>
            )}
          </Link>
          <Box>
            <Heading size="sm">From: {postData?.author}</Heading>
            <Text fontWeight="semibold" fontSize="xs" letterSpacing="wide">
              Created on:{' '}
              {new Date(postData?.createdOn).toLocaleDateString(
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
        <Heading size="sm" px="15px" pb="15px" pt="10px" align={'center'}>
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
                {like ? 'Like' : 'Unlike'}
              </span>
            </span>
          </Button>
        )}
        <Text color="gray.500" mb={2}>Likes: {likesCount}</Text>
        <Button
          as={Link}
          to={`/post/${postId}`}
          bg={'orange.300'}
          color={'black'}
        >
          Read more
        </Button>
      </CardFooter>
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
