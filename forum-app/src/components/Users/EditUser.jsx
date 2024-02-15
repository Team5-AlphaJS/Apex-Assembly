import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUser } from "../../services/users.service";
import PropTypes from "prop-types";

export default function EditUser({ userData, updateUserData }) {
  const [user, setUser] = useState({
    ...userData,
    avatarUrl: userData?.avatarUrl || '',
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    // phoneNumber: userData?.phoneNumber || '', OPTIONAL
  });
  const navigate = useNavigate();
  const toast = useToast();

  const onInputChange = prop => e => {
    setUser({ ...user, [prop]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      const updatedUserData = await editUser(user);
      setUser(updatedUserData);
      await updateUserData(user);
      toast({
        title: "User updated successfully.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/user/${user?.uid}`);
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to update user.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <h1>Edit user</h1>
      <label htmlFor="avatarUrl">Avatar URL: </label>
      <input
        type="text"
        name="avatarUrl"
        id="avatarUrl"
        value={user.avatarUrl}
        onChange={onInputChange('avatarUrl')}
      /><br />
      <label htmlFor="firstName">First name: </label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={user.firstName}
        onChange={onInputChange('firstName')}
      /><br />
      <label htmlFor="lastName">Last name: </label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={user.lastName}
        onChange={onInputChange('lastName')}
      /><br />
      {/* <label htmlFor="phoneNumber">Phone number: </label>
      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        value={user.phoneNumber}
        onChange={onInputChange('phoneNumber')}
      /><br /> */}
      <Button type="submit" colorScheme="green" bg="green.300" size={'md'} w={100} onClick={onSubmit}>Submit</Button>
    </div>
  );
}

EditUser.propTypes = {
  userData: PropTypes.object,
  updateUserData: PropTypes.func,
};