import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../services/auth.service";
import { Avatar, Box, Button, Image, Menu, MenuButton, MenuItem, MenuList, Text, useToast } from "@chakra-ui/react";
import logo from '../../assets/black-helmet.svg';
import { FiEdit, FiUser } from "react-icons/fi";

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
      <NavLink to="/">
        <Image src={logo} alt="logo" display={"inline-block"} mr={1} />
        <Text color={"black"} display={"inline-block"} position={'absolute'} top={'1'}>Apex Assembly</Text>
      </NavLink>
      <Box>
      <NavLink to="/">Home </NavLink>
      { user && <NavLink to="/categories">Categories </NavLink> }
      { user && <NavLink to="/create-post">Create post </NavLink> }
      { user !== null && userData?.role === "admin" && <NavLink to="/admin">Admin </NavLink>}
      { user 
        ? (
          <>
            {`Welcome, ${userData?.username} `}
            <Menu>
              <MenuButton as={Box} display={'inline-block'} cursor={'pointer'}>
                <Avatar name={userData?.username} src={userData?.avatarUrl} size="sm" mr={1} />
              </MenuButton>
              <MenuList>
                <MenuItem as={NavLink} to={`#`} icon={<FiEdit />}>Edit User</MenuItem>
                <MenuItem as={NavLink} to={`#`} icon={<FiUser />}>User Details</MenuItem>
              </MenuList>
            </Menu>
            <Button onClick={logout} colorScheme="orange" bg="orange.300" size={'sm'} w={20}>Logout</Button>
          </>
        )
        : (<>
          <NavLink to="/login">Login </NavLink>
          <NavLink to="/register">Register </NavLink>
        </>) }
      </Box>
    </header>
  );
}
