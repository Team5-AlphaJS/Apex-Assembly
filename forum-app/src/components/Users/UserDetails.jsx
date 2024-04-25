import {
  Avatar,
  Box,
  Button,
  HStack,
  Spacer,
  Text,
  VStack,
  useColorMode,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  useToast,
  Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { editUser, getUserData } from '../../services/users.service';
// import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { uploadAvatar } from '../../services/image.service';
import { FaEdit, FaTrash, FaUpload } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

/**
 * Renders the details of a user.
 *
 * @component
 * @param {Object} currentUser - The current user object.
 * @returns {JSX.Element} The UserDetails component.
 */
export default function UserDetails({ currentUser, updateUserData }) {
  const id = useParams().id;
  const [userData, setUserData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [avatarUpload, setAvatarUpload] = useState(null);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const toast = useToast();

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

  const handleAvatarUploading = async () => {
    try {
      setLoading(true);
      const uploadedAvatarURL = await uploadAvatar(avatarUpload);
      setAvatarUpload(null);

      const fileInput = document.querySelector('input[type="file"]');
      fileInput.value = '';

      const newUserData = { ...userData, avatarUrl: uploadedAvatarURL };
      await editUser(newUserData);
      setUserData(newUserData);
      updateUserData(newUserData);

      toast({
        title: 'Avatar changed successfully.',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarRemoving = async () => {
    try {
      setLoading(true);
      const newUserData = { ...userData, avatarUrl: '' };
      await editUser(newUserData);
      setUserData(newUserData);
      updateUserData(newUserData);
      toast({
        title: 'Avatar removed successfully.',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error removing avatar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center>
      <VStack
        spacing={4}
        align="center"
        minW="full"
        style={{
          position: 'absolute',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {currentUser?.uid === userData?.uid ? (
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setShowEditIcon(true)}
            onMouseLeave={() => setShowEditIcon(false)}
          >
            <Avatar
              cursor={'pointer'}
              size="xl"
              name={userData?.username}
              src={userData?.avatarUrl}
              onClick={onOpen}
              _hover={{ opacity: 0.5 }}
              transition={'opacity 0.3s'}
            />
            {showEditIcon && (
              <FaEdit
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                size={24}
                color="white"
                cursor={'pointer'}
                onClick={onOpen}
              />
            )}
          </div>
        ) : (
          <Avatar
            size="xl"
            name={userData?.username}
            src={userData?.avatarUrl}
          />
        )}

        <Modal isOpen={isOpen} onClose={onClose} size={'lg'} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Change Avatar</ModalHeader>
            <ModalBody>
              {avatarUpload ? (
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Avatar
                    size="xl"
                    src={URL.createObjectURL(avatarUpload)}
                    alt="Avatar Preview"
                    mb={4}
                    mr={4}
                  />
                </Box>
              ) : (
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Avatar
                    size="xl"
                    name={userData?.username}
                    src={userData?.avatarUrl}
                    mb={4}
                    mr={4}
                  />
                </Box>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarUpload(e.target.files[0])}
                variant={'flushed'}
              />
            </ModalBody>
            <ModalFooter>
              {userData?.avatarUrl && !avatarUpload && (
                <Button
                  variant={'ghost'}
                  colorScheme="red"
                  onClick={handleAvatarRemoving}
                  leftIcon={<FaTrash />}
                  isLoading={isLoading}
                  loadingText="Removing"
                >
                  Remove Avatar
                </Button>
              )}
              <Spacer />
              <Button
                variant="outline"
                colorScheme="orange"
                mr={3}
                onClick={() => {
                  setAvatarUpload(null);
                  onClose();
                }}
                leftIcon={<FiX />}
              >
                Close
              </Button>
              <Button
                colorScheme="green"
                pointerEvents={!avatarUpload ? 'none' : 'all'}
                opacity={!avatarUpload ? '0.3' : '1'}
                onClick={handleAvatarUploading}
                leftIcon={<FaUpload />}
                isLoading={isLoading}
                loadingText="Saving"
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          color={isDarkMode}
        >
          User: {userData?.username}
        </Text>
        <Text fontSize="lg" textAlign="center" color={isDarkMode}>
          Email: {userData?.email}
        </Text>
        {userData?.firstName && (
          <Text fontSize="lg" textAlign="center" color={isDarkMode}>
            First Name: {userData?.firstName}
          </Text>
        )}
        {userData?.lastName && (
          <Text fontSize="lg" textAlign="center" color={isDarkMode}>
            Last Name: {userData?.lastName}
          </Text>
        )}
        {/* <Text fontSize="lg"  textAlign="center" color={isDarkMode}>
          Phone: {userData?.phone}
        </Text> OPTIONAL*/}
        <HStack justifyContent="center" spacing={4}>
          <Button
            as={Link}
            to={{
              pathname: `/user/${userData?.uid}/posts`,
              state: { userData },
            }}
            colorScheme="orange"
            variant="outline"
          >
            User Posts
          </Button>

          <Spacer minW={'5rem'} />

          <Button
            as={Link}
            to={{
              pathname: `/user/${userData?.uid}/liked-posts`,
              state: { userData },
            }}
            colorScheme="orange"
            variant="outline"
          >
            Liked Posts
          </Button>
        </HStack>
        {currentUser?.uid === userData?.uid && (
          <Button
            as={Link}
            to={{ pathname: '/user/edit', state: { userData } }}
            colorScheme="orange"
            variant="outline"
            w={'22.8%'}
          >
            Edit User
          </Button>
        )}
      </VStack>
    </Center>
  );
}

UserDetails.propTypes = {
  currentUser: PropTypes.object,
  updateUserData: PropTypes.func,
};
