import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserData } from '../../services/users.service';
import { getLikedPosts } from '../../services/post.service';

export default function LikedPosts() {
  const id = useParams().id;
  const [userData, setUserData] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);

  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const snapshot = await getUserData(id);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const userKey = Object.keys(userData)[0];
            setUserData(userData[userKey]);
          } else {
            console.log(`User data not found for UID: ${id}`);
          }
        } catch (e) {
          console.error(e.message);
        }
      }
    };
    fetchUserData();
  }, [id]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      if (userData && userData?.username) {
        try {
          const likedPosts = await getLikedPosts(userData?.username);
          setLikedPosts(likedPosts);
        } catch (error) {
          console.error('Error fetching liked posts:', error);
        }
      }
    };
    fetchLikedPosts();
  }, [userData]);

  return (
    <Box px={4}>
      <Heading
        size="lg"
        mb={4}
        textAlign="center"
        // bg={isDarkMode ? 'gray.700' : 'white'}
      >
        User&apos;s Liked Posts
      </Heading>
      <VStack align="center">
        <Flex
          fontWeight="bold"
          bg={'orange.300'}
          color="black"
          justifyContent="space-between"
          p={2}
          mb={4}
          w={'90%'}
        >
          <Heading flex="1" size={'md'}>
            Title
          </Heading>
          <Heading flex="1" size={'md'}>
            Likes
          </Heading>
          <Heading flex="1" size={'md'}>
            Category
          </Heading>
          <Heading flex="1" size={'md'}>
            Details
          </Heading>
          <Heading flex="1" size={'md'}>
            Created On
          </Heading>
        </Flex>
      </VStack>
      <VStack spacing={5} align="center">
        {likedPosts.map((post) => (
          <Flex
            key={post?.createdOn}
            border={'1px solid black'}
            borderRadius="md"
            p={4}
            w={'90%'}
            alignItems="center"
            justifyContent="space-between"
            // bg={isDarkMode ? 'gray.700' : 'white'}
            bgImage={post?.imgUrl}
            bgSize={'cover'}
            bgPosition={'center'}
          >
            <Box
              flex="1"
              color={'white'}
              fontWeight={'bold'}
              style={{ WebkitTextStroke: '0.7px black' }}
            >
              {post?.title}
            </Box>
            <Box
              flex="1"
              color={'white'}
              fontWeight={'bold'}
              style={{ WebkitTextStroke: '0.7px black' }}
            >
              {Object.keys(post?.likes || {}).length}
            </Box>
            <Box
              flex="1"
              color={'white'}
              fontWeight={'bold'}
              style={{ WebkitTextStroke: '0.7px black' }}
            >
              {post?.category}
            </Box>
            <Box flex="1" color={'white'} fontWeight={'bold'}>
              <Button
                as={Link}
                to={{ pathname: `/post/${post?.id}` }}
                state={{ data: post?.id }}
                flex="1"
                color={isDarkMode ? 'white' : 'black'}
                size={'sm'}
                bg={isDarkMode ? 'gray.700' : 'white'}
                border={'1px solid black'}
              >
                Details
              </Button>
            </Box>
            <Box
              flex="1"
              color={'white'}
              fontWeight={'bold'}
              style={{ WebkitTextStroke: '0.7px black' }}
            >
              {new Date(post?.createdOn).toLocaleDateString()}
            </Box>
          </Flex>
        ))}
      </VStack>
      {likedPosts.length === 0 && (
        <Text fontSize={'lg'} textAlign={'center'}>
          No liked posts
        </Text>
      )}
    </Box>
  );
}
