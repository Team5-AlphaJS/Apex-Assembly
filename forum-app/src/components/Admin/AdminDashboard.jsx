import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  getAllUsersData,
  handleToggleRole,
} from '../../services/users.service';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsersData()
      .then(setUsers)
      .catch((e) => console.error('Error getting all users data:', e.message));
  }, []);

  const handleToggle = async (userId, currentRole) => {
    const newRole = currentRole === 'user' ? 'blocked' : 'user';
    await handleToggleRole(userId, newRole);
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <>
      <VStack align={'center'}>
        <Flex
          justifyContent={'center'}
          bg={'orange.300'}
          color="black"
          px="4"
          py="2"
          w={'90%'}
        >
          <Heading fontSize="xl" fontWeight="bold">
            Admin Dashboard
          </Heading>
        </Flex>
      </VStack>
      <Center>
        <Box p="6">
          <Flex flexWrap="wrap" justifyContent="flex-start" gap={3}>
            {users.map(
              (user) =>
                user.role !== 'admin' && (
                  <Box
                    key={user.id}
                    border={'2px solid black'}
                    borderRadius="md"
                    boxShadow="md"
                    minWidth="300px"
                    p={4}
                    bgImage={'https://png.pngtree.com/thumb_back/fh260/background/20230707/pngtree-3d-illustration-of-a-race-car-speeding-around-the-track-image_3772133.jpg'}
                    bgSize={'cover'}
                  >
                    <Flex
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Link to={`/user/${user?.uid}`}>
                        <Avatar name={user?.username} src={user?.avatarUrl} />
                      </Link>
                      <Text fontWeight="bold" color={'white'}>{user?.username}</Text>
                      <Button
                        onClick={() => handleToggle(user?.id, user?.role)}
                        color={'white'}
                        bg={`${
                          user?.role === 'user' ? 'red.500' : 'green.500'
                        }`}
                        _hover={{
                          bg: user?.role === 'user' ? 'red.700' : 'green.700',
                        }}
                      >
                        {user?.role === 'user' ? 'Block' : 'Unblock'}
                      </Button>
                    </Flex>
                  </Box>
                )
            )}
          </Flex>
        </Box>
      </Center>
    </>
  );
}