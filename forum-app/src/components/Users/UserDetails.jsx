import { Avatar, Box, Button, HStack, Spacer, Text, VStack, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserData } from "../../services/users.service";
import PropTypes from "prop-types";

/**
 * Renders the details of a user.
 * 
 * @component
 * @param {Object} currentUser - The current user object.
 * @returns {JSX.Element} The UserDetails component.
 */
export default function UserDetails({ currentUser }) {
  const id = useParams().id;
  const [userData, setUserData] = useState(null);

  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const snapshot = await getUserData(id);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const userKey = Object.keys(userData)[0];
            setUserData(userData[userKey]);
          } else {
            console.log(`User data not found for UID: ${id}`);
          }
        } catch (e) {
          console.error(e.message);
        }
      }
    };
    fetchUserData();
  }, [id]);

  return (
    <Box p={8} >
      <VStack spacing={4} align="center" minW='full'>
        <Avatar size="xl" name={userData?.username} src={userData?.avatarUrl} />

        <Text fontSize="2xl" fontWeight="bold" textAlign="center" color={isDarkMode}>
          User: {userData?.username}
        </Text>
        <Text fontSize="lg" textAlign="center" color={isDarkMode}>
          Email: {userData?.email}
        </Text>
        <Text fontSize="lg" textAlign="center" color={isDarkMode}>
          First Name: {userData?.firstName}
        </Text>
        <Text fontSize="lg" textAlign="center" color={isDarkMode}>
          Last Name: {userData?.lastName}
        </Text>
        {/* <Text fontSize="lg"  textAlign="center" color={isDarkMode}>
          Phone: {userData?.phone}
        </Text> OPTIONAL*/ }
        <HStack justifyContent="center" spacing={4}>
          <Button as={Link} to={{ pathname: `/user/${userData?.uid}/posts`, state: { userData } }} colorScheme="orange" variant="outline">
            User Posts
          </Button>

          <Spacer minW={'5rem'}/>

          <Button as={Link} to={{ pathname:`/user/${userData?.uid}/liked-posts`, state: { userData } }} colorScheme="orange"  variant="outline">
            Liked Posts
          </Button>
        </HStack>
          {currentUser?.uid === userData?.uid && (
            <Button as={Link} to={{ pathname: '/user/edit', state: { userData } }} colorScheme="orange" variant="outline" w={'22.8%'}>
              Edit User
            </Button>
          )}
      </VStack>
    </Box>
  );
}

UserDetails.propTypes = {
  currentUser: PropTypes.object,
};