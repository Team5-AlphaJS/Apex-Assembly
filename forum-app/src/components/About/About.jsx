import { Image } from '@chakra-ui/image';
import { Box, Container, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import { useColorMode } from '@chakra-ui/color-mode';
import whiteLogo from '../../assets/white-helmet.svg';
import blackLogo from '../../assets/black-helmet.svg';

export default function About() {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const lewis =
    'https://ih1.redbubble.net/image.5139971379.0947/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg';
  const alex =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmlIIWOMV5dIFexVaroDifbKkDf3sWu7a8FQ&usqp=CAU';

  return (
    <Container maxW="container.lg" py={5}>
      <Box textAlign={'center'}>
        <Heading mb={4}>🏎️ About our Formula 1 Forum 🏎️</Heading>
        <Text fontSize={'19px'}>Connecting fans from all over the world!</Text>
      </Box>
      <Flex mt={5} alignItems="center" justifyContent="center">
        <Image
          width="200px"
          height="200px"
          src={isDarkMode ? whiteLogo : blackLogo}
          alt="apex assembly logo"
        />
        <VStack ml={10} alignItems="start" spacing={2}>
          <Text fontSize="2xl" fontWeight="bold">
            Our Goal
          </Text>
          <Text fontSize="lg">
            Apex Assembly is a forum for Formula 1 fans to connect and discuss
            their favorite sport. We strive to provide a safe and inclusive
            space for fans to share their thoughts and opinions.
          </Text>
        </VStack>
      </Flex>

      <Flex mt={10} alignItems="center" justifyContent="center">
        <Image
          width="200px"
          height="250px"
          src={lewis}
          alt="lewis black panther pose"
        />
        <VStack ml={10} alignItems="start" spacing={2}>
          <Text fontSize="2xl" fontWeight="bold">
            What can you do on Apex Assembly?
          </Text>
          <Text fontSize="lg">
            - Engage in discussions about F1 races, teams, drivers and cars.
            <br />
            - Learn about the latest news and updates in the world of Formula 1.
            <br />- Connect with fellow fans and build lasting friendships.
          </Text>
        </VStack>
      </Flex>

      <Box mt={10} textAlign={'center'}>
        <Heading mb={4}>Our Team</Heading>
        <Text fontSize='xl'>
          Our dedicated team of F1 enthusiasts is passionate about creating a
          welcoming and informative space for fans like you. We&apos;re
          committed to fostering a positive community where everyone can share
          their love for our favorite sport.
        </Text>
        <Flex mt={10} alignItems="center" justifyContent="center">
          <Image src={alex} alt="alex's avatar" />
          <VStack ml={6} alignItems="start" spacing={2}>
            <Text fontSize="xl" fontWeight="bold">
              Alexander Velikov
            </Text>
            <Text mb={4}>The Number 1 McLaren fan.</Text>
            <Text>
              <b>Favorite Team? </b>- McLaren, of course! :D
            </Text>
            <Text>
              <b>Favorite Drivers? </b>- Lando Norris, Lewis Hamilton and
              Michael Schumacher.
            </Text>
          </VStack>
        </Flex>

        {/* Will be changed later */}
        <Flex mt={10} alignItems="center" justifyContent="center">
          <Image src={alex} alt="alex's avatar" />
          <VStack ml={6} alignItems="start" spacing={2}>
            <Text fontSize="xl" fontWeight="bold">
              Martin Valov
            </Text>
            <Text mb={4}>The Number 1 McLaren fan.</Text>
            <Text>
              <b>Favorite Team? </b>- McLaren, of course! :D
            </Text>
            <Text>
              <b>Favorite Drivers? </b>- Lando Norris, Lewis Hamilton and
              Michael Schumacher.
            </Text>
          </VStack>
        </Flex>

        <Flex mt={10} alignItems="center" justifyContent="center">
          <Image src={alex} alt="alex's avatar" />
          <VStack ml={6} alignItems="start" spacing={2}>
            <Text fontSize="xl" fontWeight="bold">
              Stefan Trajkovski
            </Text>
            <Text mb={4}>The Number 1 McLaren fan.</Text>
            <Text>
              <b>Favorite Team? </b>- McLaren, of course! :D
            </Text>
            <Text>
              <b>Favorite Drivers? </b>- Lando Norris, Lewis Hamilton and
              Michael Schumacher.
            </Text>
          </VStack>
        </Flex>
      </Box>
    </Container>
  );
}
