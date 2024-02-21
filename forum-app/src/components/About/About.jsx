import { Image } from '@chakra-ui/image';
import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/layout';
import { useColorMode } from '@chakra-ui/color-mode';
import whiteLogo from '../../assets/white-helmet.svg';
import blackLogo from '../../assets/black-helmet.svg';

/**
 * Renders the About component.
 * This component displays information about the Formula 1 forum and its team members.
 * @returns {JSX.Element} The rendered About component.
 */
export default function About() {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const lewis =
    'https://ih1.redbubble.net/image.5139971379.0947/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg';
  const alex =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmlIIWOMV5dIFexVaroDifbKkDf3sWu7a8FQ&usqp=CAU';
  const marto = 'https://s.rfi.fr/media/display/460634e0-1313-11ea-b1e4-005056a99247/w:1280/p:1x1/raikkonen.jpg'
  const stefan = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSwHgFpW_e8qpfix8sgJrXo8-IWLpZPn0OdA&usqp=CAU'

  return (
    <Container maxW="container.lg" py={5}>
      <Box textAlign={'center'}>
        <Heading mb={4}>🏎️ About our Formula 1 Forum 🏎️</Heading>
        <Text fontSize={'19px'} mb={3}>Connecting fans from all over the world!</Text>
        <Link color={'orange.300'} fontSize={'19px'} href="https://github.com/Team5-AlphaJS/Forum-App" target="_blank">
          Project Repository Link
        </Link>
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
        <Flex mt={10} alignItems="center" justifyContent="left">
          <Image src={alex} alt="alex's driver" />
          <VStack ml={6} alignItems="start" spacing={2}>
            <Text fontSize="xl" fontWeight="bold">
              Alexander Velikov
            </Text>
            <Text mb={4}>The Number 1 McLaren fan.</Text>
            <Text>
              <b>Favorite Team? </b>- McLaren...what did you expect?
            </Text>
            <Text>
              <b>Favorite Drivers? </b>- Lando Norris, Lewis Hamilton and
              Michael Schumacher.
            </Text>
          </VStack>
        </Flex>

        <Flex mt={10} alignItems="center" justifyContent="left">
          <Image src={marto} alt="marto's driver" w={'275px'}/>
          <VStack ml={6} alignItems="start" spacing={2}>
            <Text fontSize="xl" fontWeight="bold">
              Martin Valov
            </Text>
            <Text mb={4}>Drinks only Redbull.</Text>
            <Text>
              <b>Favorite Team? </b>- Redbull Racing
            </Text>
            <Text>
              <b>Favorite Driver? </b>- Kimi Raikkonen
            </Text>
          </VStack>
        </Flex>

        <Flex mt={10} alignItems="center" justifyContent="left">
          <Image src={stefan} alt="stefan's driver" w={'275px'}/>
          <VStack ml={6} alignItems="start" spacing={2}>
            <Text fontSize="xl" fontWeight="bold">
              Stefan Trajkovski
            </Text>
            <Text mb={4}>Still living in the 90s.</Text>
            <Text>
              <b>Favorite Team? </b>- Honda
            </Text>
            <Text>
              <b>Favorite Driver? </b>- Ayrton Senna (RIP 🕊️)
            </Text>
          </VStack>
        </Flex>

      </Box>
    </Container>
  );
}
