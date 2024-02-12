import { useEffect, useState } from "react";
import SimplePost from "../components/SimplePost/SimplePost";
import { getAllPosts } from "../services/post.service";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then(snapshot => setPosts(Object.entries(snapshot.val())));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <div className="all-posts">
        {posts.map(post => {
          const [postId, postData] = post
          return <SimplePost key={postId} postId={postId} postData={postData} />
        })}
      </div>
    </div>
  );
}
