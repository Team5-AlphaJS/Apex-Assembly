import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useColorMode,
  useToast,
  Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  postContentValidation,
  postTitleValidation,
  // urlValidation,
} from '../../validation/form-validation';
import { uploadPostImage } from '../../services/image.service';

/**
 * Renders a form for creating or editing a post.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.post - The post object.
 * @param {Function} props.setPost - The function to update the post object.
 * @param {Function} props.requestFunc - The function to handle the request for creating or editing a post.
 * @param {boolean} props.onEdit - Indicates whether the form is for editing an existing post.
 * @returns {JSX.Element} The CreateEditPost component.
 */
const CreateEditPost = ({ post, setPost, requestFunc, onEdit }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [postImageAttach, setPostImageAttach] = useState(null);

  const updatePost = (prop) => (e) => {
    setPost({ ...post, [prop]: e.target.value });
  };

  /**
   * Handles the form submission for creating or editing a post.
   * @returns {Promise<void>} A promise that resolves when the submission is complete.
   */
  const onSubmit = async () => {
    try {
      setLoading(true);
      const postImageURL = await uploadPostImage(postImageAttach);
      post.imgUrl = postImageURL;
      await requestFunc(post);
      // this approach wont work because
      // we are calling the function with a copy of the post object
      // and onEdit validates with the post object state which wont be updated
      // await requestFunc({ ...post, imgUrl: postImageURL });
      toast({
        title: `Post ${onEdit ? 'edited' : 'created'} successfully.`,
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
      reset();
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
      navigate(-1);
    }
  };

  return (
    <Container
      maxW="90%"
      border={'1px solid'}
      p={4}
      borderRadius={'lg'}
      bg={isDarkMode ? 'gray.900' : 'gray.300'}
    >
      <Heading mb={4}>{onEdit ? 'Edit' : 'Create'} post</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.title}>
          <FormLabel>Title: </FormLabel>
          <Input
            type="text"
            placeholder="Post Title Here"
            focusBorderColor="orange.300"
            mb={4}
            value={post.title}
            {...register('title', postTitleValidation)}
            onChange={updatePost('title')}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.content}>
          <FormLabel>Content: </FormLabel>
          <Textarea
            placeholder="Post Content Here"
            focusBorderColor="orange.300"
            mb={4}
            value={post.content}
            {...register('content', postContentValidation)}
            onChange={updatePost('content')}
          />
          <FormErrorMessage>
            {errors.content && errors.content.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.category}>
          <FormLabel>Category: </FormLabel>
          <Select
            mb={4}
            focusBorderColor="orange.300"
            value={post.category}
            {...register('category', { required: 'Category is required' })}
            onChange={updatePost('category')}
          >
            <option value="">Select Category</option>
            <option value="drivers">drivers</option>
            <option value="tracks">tracks</option>
            <option value="teams">teams</option>
            <option value="cars">cars</option>
          </Select>
          <FormErrorMessage>
            {errors.category && errors.category.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.imgUrl}>
          <FormLabel>Post Image (optional):</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setPostImageAttach(e.target.files[0])}
            variant={'flushed'}
            focusBorderColor="orange.300"
            mb={4}
            // value={post.imgUrl}
            // {...register('imgUrl', { validate: urlValidation })}
          />
          {postImageAttach && (
            <Image
              src={URL.createObjectURL(postImageAttach)}
              alt="Post Preview"
              mb={4}
              w={300}
            />
          )}
        </FormControl>
        <Button
          type="submit"
          colorScheme="orange"
          bg="orange.300"
          color={'black'}
          size={'md'}
          w={125}
          variant={'ghost'}
          isLoading={isLoading}
          loadingText={onEdit ? 'Saving' : 'Publishing'}
        >
          {onEdit ? 'Save' : 'Publish'}
        </Button>
      </form>
    </Container>
  );
};

CreateEditPost.propTypes = {
  post: PropTypes.object.isRequired,
  setPost: PropTypes.func.isRequired,
  requestFunc: PropTypes.func.isRequired,
  onEdit: PropTypes.bool,
};

export default CreateEditPost;
