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
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  postContentValidation,
  postTitleValidation,
  urlValidation,
} from '../../validation/form-validation';


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

  const updatePost = (prop) => (e) => {
    setPost({ ...post, [prop]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      await requestFunc(post);
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
          <FormLabel>Image URL: </FormLabel>
          <Input
            type="text"
            placeholder="Image Url (optional)"
            focusBorderColor="orange.300"
            mb={4}
            value={post.imgUrl}
            {...register('imgUrl', { validate: urlValidation })}
            onChange={updatePost('imgUrl')}
          />
          <FormErrorMessage mb={2}>
            {errors.imgUrl && errors.imgUrl.message}
          </FormErrorMessage>
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
