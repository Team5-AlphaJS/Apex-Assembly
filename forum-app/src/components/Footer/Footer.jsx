import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

/**
 * Footer component.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function Footer() {
  const isDarkMode = useColorModeValue(false, true);
  
  return (
    <Box
      borderTop="5px solid"
      borderTopColor={"orange.300"}
      borderBottom="2px solid"
      height="60px"
      align="center"
      justifyContent={'center'}
      px="4"
      display="flex"
      alignItems="center"
      bg={isDarkMode ? "gray.900" : "gray.200"}
    >
      <Text pr={3}>&copy; 2024 - All rights reserved</Text>
      <NavLink to="/about">About us</NavLink>
    </Box>
  );
}