import { Box, VStack, Flex, Text } from "@chakra-ui/react";
import Navbar from "../../../components/Navbar/Navbar";
import { useAuth } from "../../../context/useAuth";
import { useEvents } from "../hooks/useEvents";
import { useEffect } from "react";
import SimpleTerminal from "../components/SimpleTerminal";
import { FaLightbulb } from "react-icons/fa";
import Footer from "../../../components/Footer/Footer";

const Events = () => {
  const { user, isLoggedIn } = useAuth();
  console.log(isLoggedIn());

  const { currentEvent, pastEvents, eventsName } = useEvents();
  useEffect(() => {
    console.log("Evenimente actualizate în state:", eventsName);
  }, [eventsName]);

  return (
    <Box>
      <Navbar />
      <Flex direction="column" minH="100vh">
        <VStack
          pt={36}
          pb={20}
          spaceX={4}
          animation={"fadeIn 0.5s ease-in-out"}
        >
          <Text
            fontSize="3xl"
            fontWeight="900"
            fontFamily="Inter"
            color="whiteAlpha.900"
          >
            De aici se pot accesa evenimentele trecute, dar si evenimentul
            curent.
          </Text>
          <Text
            fontSize="xl"
            fontWeight="semibold"
            fontFamily="Inter"
            color="whiteAlpha.900"
          >
            Fiecare eveniment o sa va redirectioneze catre o pagina cu detalii
            despre el si puzzle-urile sale.
          </Text>
        </VStack>

        <Flex
          direction="row"
          w="100%"
          gap={8}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box animation={"fadeIn 0.5s ease-in-out"}>
            <Flex
              align="center"
              bg="inherit"
              p={4}
              color="#646cff"
              border={"2px solid #646cff"}
              fontSize="sm"
              fontFamily={"Inter"}
              gap={2}
              borderRadius="lg"
              justifyContent={"center"}
              mb={8}
            >
              <Box as={FaLightbulb} boxSize={4} />
              <Text>
                Incearca comanda <b>help</b> pentru a vedea comenzile
                disponibile.
              </Text>
            </Flex>

            <SimpleTerminal
              user={user}
              currentEvent={currentEvent}
              pastEvents={pastEvents}
            />
          </Box>
        </Flex>
        <Footer />
      </Flex>
    </Box>
  );
};

export default Events;
