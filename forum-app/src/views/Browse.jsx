import { Box, Container, Flex, Heading, Text, Select } from "@chakra-ui/react";
import { getAllPosts } from "../services/post.service";
import { useEffect, useState } from "react";
import SimplePost from "../components/SimplePost/SimplePost";



export default function Browse() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filterByCategory, setFilterByCategory] = useState('');

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

        setPosts(postsArray);
      })
      .catch(error => console.error(error.message));
  }, [sortBy, filterByCategory]);

  return (
    <div>
      <Container maxW="100%">
        <Heading textAlign={'center'} mb={3}>All posts</Heading>
        <Flex justifyContent="space-between" mb={4}>
          <Select
            placeholder="Sort by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="date">Date</option>
          </Select>
          <Select
            placeholder="Filter by category"
            value={filterByCategory}
            onChange={(e) => setFilterByCategory(e.target.value)}
          >
            <option value="">All categories</option>
            <option value="drivers">Drivers</option>
            <option value="tracks">Tracks</option>
            <option value="teams">Teams</option>
            <option value="cars">Cars</option>
          </Select>
        </Flex>
        <Flex direction={'column'} mx={4}>
          {posts.map(post => (
            <SimplePost key={post.id} postId={post.id} postData={post} />
          ))}
        </Flex>
      </Container>
    </div>
  );
}
