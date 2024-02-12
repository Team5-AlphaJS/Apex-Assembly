import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth.service";
import { Button, useToast } from "@chakra-ui/react";

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

  const updateForm = prop => e => {
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
        title: "You are logged in",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
    });
    } catch (error) {
      toast({
        title: "Logging in failed",
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
      <h1>Login</h1>
      <label htmlFor="email">Email: </label><input value={form.email} onChange={updateForm('email')} type="text" id="email" name="email" /><br/>
      <label htmlFor="password">Password: </label><input value={form.password} onChange={updateForm('password')} type="password" id="password" name="password" /><br/>
      <Button type="submit" colorScheme="green" bg="green.300" size={'md'} w={150}
      isLoading={isLoading} loadingText="Logging In" onClick={login}
      >
        Log In
      </Button>
    </div>
  )
}