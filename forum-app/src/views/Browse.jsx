import { Container, Flex, Heading, Select, useColorMode } from "@chakra-ui/react";
import { getAllPosts } from "../services/post.service";
import { useEffect, useState } from "react";
import SimplePost from "../components/SimplePost/SimplePost";

/**
 * Renders the Browse component, which displays a list of posts with sorting and filtering options.
 *
 * @returns {JSX.Element} The rendered Browse component.
 */
export default function Browse() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filterByCategory, setFilterByCategory] = useState('');
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  useEffect(() => {
    Promise.all([getAllPosts()])
      .then(([postSnapshot]) => {
        const postsData = postSnapshot.val() || {};

        let postsArray = Object.entries(postsData).map(([postId, postData]) => ({ id: postId, ...postData }));

        if (filterByCategory) {
          postsArray = postsArray.filter(post => post.category === filterByCategory);
        }

        if (sortBy === 'title') {
          postsArray.sort((a, b) => a.title.localeCompare(b.title));
        }

        if (sortBy === 'date') {
          postsArray.sort((a, b) => b.createdOn - a.createdOn);
        }

        if (sortBy === 'likes') {
          postsArray.sort((a, b) => {
            const likesCountA = Object.keys(a.likes || {}).length;
            const likesCountB = Object.keys(b.likes || {}).length;
            return likesCountB - likesCountA;
          });
        }

        setPosts(postsArray);
      })
      .catch(error => console.error(error.message));
  }, [sortBy, filterByCategory]);

  return (
    <div>
      <Container maxW="100%">
        <Heading textAlign={'center'} mb={5}>All posts</Heading>
        <Flex justifyContent="space-between" mb={7}>
          <Select
            bgColor={isDarkMode ? 'gray.700' : 'gray.300'}
            focusBorderColor="orange.300"
            mr={5}
            placeholder="Sort by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="date">Date</option>
            <option value="likes">Most Likes</option>
          </Select>
          <Select
            bgColor={isDarkMode ? 'gray.700' : 'gray.300'}
            focusBorderColor="orange.300"
            mr={3}
            placeholder="Filter by category"
            value={filterByCategory}
            onChange={(e) => setFilterByCategory(e.target.value)}
          >
            <option value="drivers">Drivers</option>
            <option value="tracks">Tracks</option>
            <option value="teams">Teams</option>
            <option value="cars">Cars</option>
          </Select>
        </Flex>
        <Flex flexWrap={'wrap'} gap={6} justifyContent={'center'}>
          {posts.map(post => (
            <SimplePost key={post.id} postId={post.id} postData={post} />
          ))}
        </Flex>
      </Container>
    </div>
  );
}
