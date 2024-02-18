import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.service";
import { createUserHandle, getUserByUsername } from "../../services/users.service";
import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Link, Text, useToast } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';

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

  const updateForm = prop => e => {
    setForm({ ...form, [prop]: e.target.value });
  };

  const register = async () => {
    try {
      setLoading(true);
      const user = await getUserByUsername(form.username);

      if (user.exists()) {
        toast({
          title: "Username already exists",
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
      });
        return;
      }

      const credentials = await registerUser(form.email, form.password);
      await createUserHandle(form.username, credentials.user.uid, form.email, 'user');

      setUser({ user, userData: null });
      toast({
        title: "You are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
    });
      navigate('/');
    } catch (error) {
      toast({
        title: "Register was failed",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
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
            mb={4}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Username: </FormLabel>
          <Input
            value={form.username}
            onChange={updateForm('username')}
            type="text"
            placeholder="username here"
            mb={4}
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
          onClick={register}
        >
          Register
        </Button>
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