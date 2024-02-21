import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth.service';
import {
  createUserHandle,
  getUserByUsername,
} from '../../services/users.service';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  emailValidation,
  passwordValidation,
  usernameValidation,
} from '../../validation/form-validation';

/**
 * Renders the Register component.
 * 
 * @returns {JSX.Element} The Register component.
 */
export default function Register() {
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /**
   * Updates the form state with the provided property value.
   *
   * @param {string} prop - The property to update in the form state.
   * @returns {Function} - The event handler function.
   */
  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  /**
   * Handles the registration process.
   * 
   * @param {Object} data - The registration data.
   * @returns {Promise<void>} - A promise that resolves when the registration is complete.
   */
  const onRegister = async (data) => {
    try {
      setLoading(true);
      const user = await getUserByUsername(data.username);

      if (user.exists()) {
        toast({
          title: 'Username already exists',
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 5000,
        });
        return;
      }

      const credentials = await registerUser(data.email, data.password);
      await createUserHandle(
        data.username,
        credentials.user.uid,
        credentials.user.email,
        'user'
      );

      setUser({ user, userData: null });
      toast({
        title: 'You are logged in',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
      reset();
      navigate('/');
    } catch (error) {
      toast({
        title: 'Register was failed',
        description: error.message,
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center>
      <Box border={'1px solid'} borderRadius={'lg'} p={4} mt={'40px'}>
        <Heading mb={4}>Register</Heading>
        <form onSubmit={handleSubmit((data) => onRegister(data))}>
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email: </FormLabel>
            <Input
              ref={emailRef}
              required
              onChange={updateForm('email')}
              {...register('email', emailValidation)}
              type="text"
              placeholder="enter@youremail.com"
              focusBorderColor='orange.300'
              mb={4}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel>Password: </FormLabel>
            <Input
              ref={passwordRef}
              required
              onChange={updateForm('password')}
              {...register('password', passwordValidation)}
              type="password"
              placeholder="password here"
              focusBorderColor='orange.300'
              mb={4}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.username}>
            <FormLabel>Username: </FormLabel>
            <Input
              ref={usernameRef}
              required
              onChange={updateForm('username')}
              {...register('username', usernameValidation)}
              type="text"
              placeholder="username here"
              focusBorderColor='orange.300'
              mb={4}
            />
            <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            type="submit"
            colorScheme="orange"
            bg="orange.300"
            color={'black'}
            variant={'ghost'}
            size={'md'}
            w={'full'}
            isLoading={isLoading}
            loadingText="Logging In"
          >
            Register
          </Button>
        </form>
        <Text mt={4}>
          Already have an account?{' '}
          <Link
            as={RouterLink}
            to={'/login'}
            color={'orange.300'}
            fontWeight={'bold'}
          >
            Log In
          </Link>{' '}
          instead!
        </Text>
      </Box>
    </Center>
  );
}
