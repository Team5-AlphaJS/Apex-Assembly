import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { uploadPost } from "../services/post.service";

export default function CreatePost() {
  const { userData } = useContext(AuthContext);
  const TITLE_MIN_LENGTH = 16;
  const TITLE_MAX_LENGTH = 64;
  const DESCRIPTION_MIN_LENGTH = 32;
  const DESCRIPTION_MAX_LENGTH = 8192;

  const [post, setPost] = useState({
    title: '',
    description: '',
    category: '',
    author: userData.username,
    imgUrl: '',
  });

  const updatePost = prop => e => {
    setPost({ ...post, [prop]: e.target.value });
  };

  const createPost = async () => {
    if (post.title.length < TITLE_MIN_LENGTH || post.title.length > TITLE_MAX_LENGTH) {
      return console.log(`Title must be between ${TITLE_MIN_LENGTH} and ${TITLE_MAX_LENGTH} cahracters long!`);
    }

    if (post.description.length < DESCRIPTION_MIN_LENGTH || post.description.length > DESCRIPTION_MAX_LENGTH) {
      return console.log(`Description must be between ${DESCRIPTION_MIN_LENGTH} and ${DESCRIPTION_MAX_LENGTH} cahracters long!`)
    }

    await uploadPost(post);
  };

  return (
    <>
      <h1>Create Post</h1>
      <label htmlFor="title">Title: </label>
      <input
        type="text"
        name="title"
        id="title"
        value={post.title}
        onChange={updatePost('title')}

      /><br />
      <label htmlFor="description">Description: </label>
      <textarea
        id="description"
        value={post.description}
        onChange={updatePost('description')}
      /><br />
      <select id="category" value={post.category} onChange={updatePost('category')}>
        <option>Categry</option>
        <option>drivers</option>
        <option>tracks</option>
        <option>teams</option>
        <option>cars</option>
      </select><br />
      <input type="text" placeholder="Image url" value={post.imgUrl} onChange={updatePost('imgUrl')} />
      <button onClick={createPost}>Create</button>
    </>
  )
}
// const post = {
//     title: String,
//     content: String,
//     categoty: String,
//     author: String, // uid
//     createdOn: String,
//     likedBy: Object,
//     comments: Object,
// };

// drivers
// tracks
// teams
// cars