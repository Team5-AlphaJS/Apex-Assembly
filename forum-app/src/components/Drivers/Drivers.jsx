import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react';
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
              border={isDarkMode ? '1px solid white' : '1px solid black'}
              bgColor={
                driver.team_name === 'Alfa Romeo'
                  ? 'green.400'
                  : driver.team_name === 'AlphaTauri'
                  ? 'blue.400'
                  : driver.team_name === 'Alpine'
                  ? 'pink.400'
                  : driver.team_name === 'Aston Martin'
                  ? 'green.600'
                  : driver.team_name === 'Ferrari'
                  ? 'red.600'
                  : driver.team_name === 'Haas F1 Team'
                  ? 'gray.400'
                  : driver.team_name === 'McLaren'
                  ? 'orange.400'
                  : driver.team_name === 'Mercedes'
                  ? 'teal.400'
                  : driver.team_name === 'Red Bull Racing'
                  ? 'blue.700'
                  : driver.team_name === 'Williams'
                  ? 'blue.300'
                  : 'gray.300'
              }
              borderRadius="md"
            >
              <Text fontSize="xl" fontWeight="bold" align={'center'}>
                {driver.full_name}
              </Text>
              <Text align={'center'}>
                Team:{' '}
                <b>
                {driver.team_name === 'AlphaTauri'
                  ? 'Racing Bulls'
                  : driver.team_name === 'Alfa Romeo'
                  ? 'Kick Sauber'
                  : driver.team_name}
                </b>
              </Text>
              <Text align={'center'}>Driver Number: <b>{driver.driver_number}</b></Text>
              <Text align={'center'}>Nationality: <b>{driver.country_code}</b></Text>
              <Center>
                <Image src={driver.headshot_url} alt="no photo" />
              </Center>
            </Box>
          ))}
      </Flex>
    </Box>
  );
}
