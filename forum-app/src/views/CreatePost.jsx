import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { uploadPost } from "../services/post.service";
import CreateEditPost from "../components/CreateEditPost.jsx/CreateEditPost";

export default function CreatePost() {
  const { userData } = useContext(AuthContext);
  const [post, setPost] = useState({
    title: '',
    description: '',
    category: '',
    author: userData ? userData.username : '',
    imgUrl: '',
  });

  return (
    <CreateEditPost post={post} setPost={setPost} requestFunc={uploadPost} />
  );
}