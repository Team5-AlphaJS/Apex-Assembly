import { useEffect, useState } from "react";
import SimplePost from "../components/SimplePost/SimplePost";
import { getAllPosts } from "../services/post.service";
import { getAllUsers } from "../services/users.service";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    Promise.all([getAllUsers(), getAllPosts()])
      .then(([userCount, postSnapshot]) => {
        setTotalUsers(userCount);
        setTotalPosts(Object.keys(postSnapshot.val()).length);
        setPosts(Object.entries(postSnapshot.val()));
      })
      .catch(error => console.error(error.message));
  }, []);

  return (
    <div>
      <Container maxW="100%">
        <Heading textAlign={'center'} mb={3}>Welcome to Team 5&apos;s Apex Assembly</Heading>
        <Heading textAlign={'center'} size={'md'}>A forum about everything Formula 1.</Heading>
        <Flex mb={8} mt={8}>
          <Box p={4} bgColor={"gray.300"} borderRadius="md" flex="1" mx={4}>
            <Heading textAlign={'center'} size={'md'} mb={2} color={'black'}>Total Users</Heading>
            <Text fontSize="xl" textAlign={'center'} color={'black'}>{totalUsers}</Text>
          </Box>
          <Box p={4} bgColor={"gray.300"} borderRadius="md" flex="1" mx={4}>
            <Heading textAlign={'center'} size="md" mb={2} color={'black'}>Total Posts</Heading>
            <Text fontSize="xl" textAlign={'center'} color={'black'}>{totalPosts}</Text>
          </Box>
        </Flex>
        <Flex direction={'column'} mx={4}>
          {posts.map(post => {
            const [postId, postData] = post
            return <SimplePost key={postId} postId={postId} postData={postData} />
          })}
        </Flex>
      </Container>
    </div>
  );
}
