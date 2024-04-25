import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllPosts } from '../../services/post.service';
import { Box, Center, Flex, Heading } from '@chakra-ui/react';
import SimplePost from '../SimplePost/SimplePost';

/**
 * Renders a search component that filters and displays posts based on a search term.
 *
 * @returns {JSX.Element} The rendered search component.
 */
export default function Search() {
  const location = useLocation();
  const searchTerm = location.state;
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    getAllPosts()
      .then((snapshot) => {
        const postsData = snapshot.val() || {};
        const postsArray = Object.entries(postsData).map(
          ([postId, postData]) => ({
            id: postId,
            ...postData,
          })
        );
        setPosts(postsArray);
      })
      .catch((error) => console.error(error.message));
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, posts]);

  return (
    <>
      {filteredPosts.length !== 0 ? (
        <Box justifyContent={'center'}>
          <Flex
            justifyContent={'center'}
            bg={'orange.300'}
            color="black"
            px="4"
            py="2"
            w={'100%'}
          >
            <Heading fontSize="xl" fontWeight="bold">
              Search for: {searchTerm}
            </Heading>
          </Flex>
          <br />
          <Flex flexWrap={'wrap'} gap={5} justifyContent={'center'} mb={'3rem'}>
            {filteredPosts.map((post) => (
              <SimplePost
                key={post.id}
                postId={post.id}
                postData={post}
                setPosts={setPosts}
              />
            ))}
          </Flex>
        </Box>
      ) : (
        <Box justifyContent={'center'}>
          <Center mb={'10'} color="orange.300">
            <Heading mb={4}>No results found for: {searchTerm}</Heading>
          </Center>
        </Box>
      )}
    </>
  );
}
