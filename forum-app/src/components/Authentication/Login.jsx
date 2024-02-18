import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth.service';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

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

  const updateForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      navigate(location.state?.from.pathname || '/');
    }
  }, [user]);

  const login = async () => {
    try {
      setLoading(true);
      const credentials = await loginUser(form.email, form.password);
      setUser({ user: credentials.user, userData: null });
      toast({
        title: 'You are logged in',
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 5000,
      });
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
        <FormControl>
          <FormLabel>Email: </FormLabel>
          <Input
            value={form.email}
            onChange={updateForm('email')}
            type="text"
            placeholder="enter@youremail.com"
            mb={4}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password: </FormLabel>
          <Input
            value={form.password}
            onChange={updateForm('password')}
            type="password"
            placeholder="password here"
          />
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
          onClick={login}
        >
          Log In
        </Button>
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
