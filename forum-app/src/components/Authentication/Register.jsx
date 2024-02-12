import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.service";
import { createUserHandle, getUserByUsername } from "../../services/users.service";
import { Button, useToast } from '@chakra-ui/react'

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
    <div>
      <h1>Register</h1>
      <label htmlFor="email">Email: </label><input value={form.email} onChange={updateForm('email')} type="text" name="email" id="email" /><br/>
      <label htmlFor="password">Password: </label><input value={form.password} onChange={updateForm('password')} type="password" name="password" id="password" /><br/>
      <label htmlFor="username">Username: </label><input value={form.username} onChange={updateForm('username')} type="text" name="username" id="username" /><br/>
      <Button type="submit" colorScheme="green" bg="green.300" size={'md'} w={150}
      isLoading={isLoading} loadingText="Register" onClick={register}
      >
        Register
      </Button>
    </div>
  )
}