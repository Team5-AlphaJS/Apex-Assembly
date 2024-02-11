import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../services/auth.service";
import { Avatar, Button, useToast } from "@chakra-ui/react";

export default function Header() {
  const { user, userData, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const logout = async () => {
    await logoutUser();
    setUser({ user: null, userData: null });
    toast({
      title: "Logged out successfully",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
  });
    navigate('/');
  };

  return (
    <header>
      <NavLink to="/">Home </NavLink>
      { user && <NavLink to="/categories">Categories </NavLink> }
      { user && <NavLink to="/create-post">Create post </NavLink> }
      { user !== null && userData?.role === "admin" && <NavLink to="/admin">Admin </NavLink>}
      { user 
        ? (
          <>
            {`Welcome, ${userData?.username} `}
            <Avatar name={userData?.username} src={userData?.avatarUrl} size="sm" mr={1} />
            <Button onClick={logout} colorScheme="orange" bg="orange.300" size={'sm'} w={20}>Logout</Button>
          </>
        )
        : (<>
          <NavLink to="/login">Login </NavLink>
          <NavLink to="/register">Register </NavLink>
        </>) }
    </header>
  );
}
