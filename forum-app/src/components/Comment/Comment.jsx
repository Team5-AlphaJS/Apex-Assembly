import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { deleteComment, updateComment } from '../../services/comment.service';
import './Comment.css';
import { Flex, Spacer, Text } from '@chakra-ui/layout';
import { useColorMode } from '@chakra-ui/color-mode';
import { Button } from '@chakra-ui/button';
import { getUserByUsername } from '../../services/users.service';
import { Avatar } from '@chakra-ui/avatar';
import { Input } from '@chakra-ui/input';
import { Textarea } from '@chakra-ui/textarea';

/**
 * Renders a comment component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.commentId - The ID of the comment.
 * @param {Object} props.commentData - The data of the comment.
 * @param {string} props.postId - The ID of the post.
 * @param {Object} props.post - The post object.
 * @param {function} props.setPost - The function to update the post object.
 * @returns {JSX.Element} The Comment component.
 */
const Comment = ({ commentId, commentData, postId, post, setPost }) => {
  const { userData } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const [onEdit, setOnEdit] = useState(false);
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [commentContent, setCommentContent] = useState(commentData.content);

  useEffect(() => {
    const fetchAuthorData = async () => {
      const userSnapshot = await getUserByUsername(commentData.author);
      const avatarUrl = userSnapshot.val()?.avatarUrl;
      setAuthorAvatar(avatarUrl);
    };
    fetchAuthorData();
  }, [commentData.author]);

  /**
   * Deletes a comment from the post.
   * @async
   * @function onDelete
   * @returns {Promise<void>}
   */
  const onDelete = async () => {
    try {
      await deleteComment(postId, commentId);
    } catch (e) {
      console.log(e.message);
    } finally {
      delete post.comments[commentId];
      setPost({ ...post });
    }
  };

  /**
   * Edits a comment by updating its content.
   * @async
   * @function editComment
   * @returns {Promise<void>}
   */
  const editComment = async () => {
    try {
      await updateComment(postId, commentId, commentContent);
    } catch (e) {
      console.log(e.message);
    } finally {
      post.comments[commentId].content = commentContent;
      setPost({ ...post });
    }
  };

  return (
    <Flex
      p={3}
      rounded={'lg'}
      alignItems="center"
      minW={'500px'}
      maxW={'1000px'}
      ml={'37.5px'}
      mb={'20px'}
      bgColor={isDarkMode ? 'gray.700' : 'gray.100'}
    >
      <Avatar size="md" mr={2} name={commentData.author} src={authorAvatar} />
      <Text fontWeight={'medium'}>{commentData.author}</Text>
      {onEdit ? (
        <>
          <Input
            ml={2}
            mr={2}
            w={'50%'}
            size={'sm'}
            focusBorderColor="orange.300"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <Button
            size={'sm'}
            mr={2}
            onClick={() => {
              editComment();
              setOnEdit(false);
            }}
          >
            Comment
          </Button>
        </>
      ) : (
        <>
          <Spacer />
          <Textarea
            readOnly
            ml={2}
            mr={2}
            pt={7}
            w={'50%'}
            size={'sm'}
            textAlign={'center'}
            border={'none'}
            _focus={{ border: 'none' }}
            bg="transparent"
            resize="none"
            value={commentData.content}
          />
        </>
      )}
      <Spacer />
      <Text mr={2} fontSize="xs" color="gray.500">
        Posted on: {new Date(commentData.createdOn).toLocaleString()}
      </Text>
      {userData && userData.username === commentData.author && (
        <Button size={'sm'} mr={2} onClick={() => setOnEdit(true)}>
          Edit
        </Button>
      )}
      {userData &&
        (userData.username === commentData.author ||
          userData.role === 'admin') && (
          <Button size={'sm'} onClick={onDelete}>
            Delete
          </Button>
        )}
    </Flex>
  );
};

Comment.propTypes = {
  commentId: PropTypes.string.isRequired,
  commentData: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  setPost: PropTypes.func.isRequired,
};

export default Comment;
