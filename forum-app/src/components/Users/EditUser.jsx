import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editUser } from '../../services/users.service';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  firstNameValidation,
  lastNameValidation,
} from '../../validation/form-validation';

/**
 * EditUser component for updating user details.
 *
 * @component
 * @param {Object} userData - The initial user data.
 * @param {Function} updateUserData - The function to update user data.
 * @returns {JSX.Element} The EditUser component.
 */
export default function EditUser({ userData, updateUserData }) {
  const [user, setUser] = useState({
    ...userData,
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
  });
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onInputChange = (prop) => (e) => {
    setUser({ ...user, [prop]: e.target.value });
  };

  /**
   * Handles the form submission for editing a user.
   * @returns {Promise<void>} A promise that resolves when the user is updated successfully.
   */
  const onSubmit = async () => {
    try {
      const updatedUserData = await editUser(user);
      setUser(updatedUserData);
      updateUserData(user);
      toast({
        title: 'User updated successfully.',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
      navigate(`/user/${user?.uid}`);
    } catch (error) {
      toast({
        title: 'Error!',
        description: 'Failed to update user.',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Center>
      <Box
        border={'1px solid'}
        borderRadius={'lg'}
        p={4}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        w={'300px'}
      >
        <Heading mb={4} fontSize={'25px'}>
          Edit User Details
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.firstName}>
            <FormLabel>First name: </FormLabel>
            <Input
              type="text"
              focusBorderColor="orange.300"
              placeholder="First Name Here"
              name="firstName"
              defaultValue={user.firstName}
              {...register('firstName', firstNameValidation)}
              onChange={onInputChange('firstName')}
              mb={4}
            />
            <FormErrorMessage>
              {errors.firstName && errors.firstName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.lastName}>
            <FormLabel>Last name: </FormLabel>
            <Input
              type="text"
              focusBorderColor="orange.300"
              placeholder="Last Name Here"
              name="lastName"
              defaultValue={user.lastName}
              {...register('lastName', lastNameValidation)}
              onChange={onInputChange('lastName')}
            />
            <FormErrorMessage>
              {errors.lastName && errors.lastName.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            mt={4}
            color={'black'}
            colorScheme="orange"
            bg="orange.300"
            size={'md'}
            w={'full'}
            variant={'ghost'}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Center>
  );
}

EditUser.propTypes = {
  userData: PropTypes.object,
  updateUserData: PropTypes.func,
};
