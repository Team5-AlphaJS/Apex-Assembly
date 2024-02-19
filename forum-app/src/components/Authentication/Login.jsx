import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth.service';
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
} from '../../validation/form-validation';

export default function Login() {
  const { user, setUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      navigate(location.state?.from.pathname || '/');
    }
  }, [user]);

  const login = async (data) => {
    try {
      setLoading(true);
      const credentials = await loginUser(data.email, data.password);
      setUser({ user: credentials.user, userData: null });
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
        title: 'Logging in failed',
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
      <Box border={'1px solid'} borderRadius={'lg'} p={4} mt={'70px'}>
        <Heading mb={4}>Log In</Heading>
        <form onSubmit={handleSubmit((data) => login(data))}>
          <FormControl isInvalid={errors.email}>
            <FormLabel>Email: </FormLabel>
            <Input
              ref={emailRef}
              required
              {...register('email', emailValidation)}
              onChange={updateForm('email')}
              type="text"
              placeholder="enter@youremail.com"
              mb={4}
            />
            <FormErrorMessage pb={2}>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel>Password: </FormLabel>
            <Input
              ref={passwordRef}
              required
              {...register('password', passwordValidation)}
              onChange={updateForm('password')}
              type="password"
              placeholder="password here"
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
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
            Log In
          </Button>
        </form>
        <Text mt={4}>
          You don&apos;t have an account?{' '}
          <Link
            as={RouterLink}
            to={'/register'}
            color={'orange.300'}
            fontWeight={'bold'}
          >
            Register
          </Link>{' '}
          instead!
        </Text>
      </Box>
    </Center>
  );
}
