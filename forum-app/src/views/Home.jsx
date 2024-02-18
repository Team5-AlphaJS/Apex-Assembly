import { useEffect, useState } from "react";
import SimplePost from "../components/SimplePost/SimplePost";
import { getAllPosts } from "../services/post.service";
import { getAllUsers } from "../services/users.service";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function Home({ updateUserData }) {
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
    <Box>
      <Container maxW="100%">
        <Box bgImage="https://c4.wallpaperflare.com/wallpaper/442/68/841/ayrton-senna-helmet-gloves-formula-1-mclaren-mp4-hd-wallpaper-preview.jpg"
            bgSize={'cover'}
            w={'99%'}
            bgPosition="center"
            color="white"
            textAlign="center"
            mb={'2rem'}
            py={20}>
        <Heading textAlign={'center'} mb={3} style={{
                WebkitTextStroke: '1px black',
                textStroke: '1px black',
            }}>Welcome to Team 5&apos;s Apex Assembly</Heading>
        <Heading textAlign={'center'} size={'md'} style={{
                WebkitTextStroke: '1px black',
                textStroke: '1px black',
            }}>A forum about everything Formula 1.</Heading>
        </Box>
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
        <Flex direction={'column'} mx={4} align={"center"}>
          {posts.map(post => {
            const [postId, postData] = post
            return <SimplePost key={post} updateUserData={updateUserData} postId={postId} postData={postData} posts={posts} setPosts={setPosts} />
          })}
        </Flex>
      </Container>
    </Box>
  );
}

Home.propTypes = {
  updateUserData: PropTypes.func,
};