import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { uploadPost } from "../services/post.service";
import CreateEditPost from "../components/CreateEditPost.jsx/CreateEditPost";

/**
 * Renders the CreatePost component.
 * 
 * @returns {JSX.Element} The CreatePost component.
 */
export default function CreatePost() {
  const { userData } = useContext(AuthContext);
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
    author: userData ? userData.username : '',
    imgUrl: '',
  });

  return (
    <CreateEditPost post={post} setPost={setPost} requestFunc={uploadPost} />
  );
}