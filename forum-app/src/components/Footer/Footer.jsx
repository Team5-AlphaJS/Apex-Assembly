import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      borderTop="5px solid"
      borderTopColor={"orange.300"}
      height="60px"
      align="center"
      justifyContent={'center'}
      px="4"
      display="flex"
      alignItems="center"
      bg="white"
    >
      <p>&copy; 2024 - All rights reserved <NavLink to="/about">About us</NavLink></p>
    </Box>
  );
}