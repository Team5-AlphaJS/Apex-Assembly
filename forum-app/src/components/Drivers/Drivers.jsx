import { Box, Center, Flex, Heading, Image, Text, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Drivers() {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch('https://api.openf1.org/v1/drivers?session_key=latest')
      .then((response) => response.json())
      .then(setDrivers)
      .catch((error) =>
        console.error('Error fetching drivers:', error.message)
      );
  }, []);

  return (
    <Box>
      <Flex
        justifyContent={'center'}
        bg={'orange.300'}
        color="black"
        px="4"
        py="2"
        w={'100%'}
      >
        <Heading fontSize="xl" fontWeight="bold">
          Drivers 2024 Season
        </Heading>
      </Flex>
      <br />
      <Flex flexWrap="wrap" justifyContent="center" gap={5} mb={5}>
        {drivers
          .sort((a, b) => a.team_name.localeCompare(b.team_name))
          .map((driver) => (
            <Box
              key={driver.driver_number}
              p={4}
              border={isDarkMode ? '1px solid white' : '2px solid black'}
              borderRadius="md"
            >
              <Text fontSize="xl" fontWeight="bold" align={'center'}>
                {driver.full_name}
              </Text>
              <Text align={'center'}>
                Team:{' '}
                {driver.team_name === 'AlphaTauri'
                  ? 'Racing Bulls'
                  : driver.team_name === 'Alfa Romeo'
                  ? 'Kick Sauber'
                  : driver.team_name}
              </Text>
              <Text align={'center'}>Number: {driver.driver_number}</Text>
              <Text align={'center'}>Nationality: {driver.country_code}</Text>
              <Center>
                <Image src={driver.headshot_url} alt='driver photo' />
              </Center>
            </Box>
          ))}
      </Flex>
    </Box>
  );
}
