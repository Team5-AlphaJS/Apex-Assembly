
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { getAllPosts } from "../services/post.service";
import { useEffect, useState } from "react";
import SimplePost from "../components/SimplePost/SimplePost";

export default function Browse() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Promise.all([getAllPosts()])
      .then(([postSnapshot]) => {
        setPosts(Object.entries(postSnapshot.val()));
      })
      .catch(error => console.error(error.message));
  }, [])

  return (
    <div>
      <Container maxW="100%">
        <Heading textAlign={'center'} mb={3}>All posts</Heading>
        <div>Sort</div>
        <div>Filter</div>
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