import { Box, Text, Flex, Button, VStack } from "@chakra-ui/react";
import { FaCode, FaTrophy, FaUserFriends, FaTerminal } from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const HelpMe = () => {
  return (
    <Box>
      <Navbar />
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        px={4}
        pt={48}
        fontFamily="Inter"
        bg="black"
        color="white"
        textAlign="center"
      >
        <Box
          bg="#646cff20"
          border="1px solid #646cff80"
          borderRadius="lg"
          p={8}
          maxW="800px"
          w="100%"
          boxShadow="lg"
          transition="all 0.3s ease"
          _hover={{ bg: "#646cff30", transform: "scale(1.02)" }}
        >
          <Text fontSize="3xl" fontWeight="bold" mb={6}>
            Cum funcționează CodeFest 🚀
          </Text>

          <VStack align="start" gap={6} fontSize="md" color="gray.300">
            <Flex align="center" gap={3}>
              <FaCode size={22} color="#646cff" />
              <Text>
                <b>CodeFest</b> este o platformă interactivă de tip{" "}
                <b>Advent Calendar</b>, unde utilizatorii rezolvă provocări
                zilnice de programare direct în browser.
              </Text>
            </Flex>

            <Flex align="center" gap={3}>
              <FaTerminal size={22} color="#646cff" />
              <Text>
                Fiecare <b>challenge</b> face parte dintr-un <b>eveniment</b>{" "}
                trecut sau curent și include multiple <b>test case-uri</b> care
                trebuie rezolvate folosind editorul nostru de cod.
              </Text>
            </Flex>

            <Flex align="center" gap={3}>
              <FaTrophy size={22} color="#646cff" />
              <Text>
                Codul tău este verificat automat. În funcție de acuratețe și
                timp de execuție, primești un <b>scor</b> și urci în{" "}
                <b>Leaderboard-ul global</b>.
              </Text>
            </Flex>

            <Flex align="center" gap={3}>
              <FaUserFriends size={22} color="#646cff" />
              <Text>
                La finalul fiecărui challenge, poți câștiga{" "}
                <b>achievement-uri</b>, iar în secțiunea <b>Social</b> poți
                discuta cu prietenii, trimite cereri și începe conversații.
              </Text>
            </Flex>

            <Flex align="center" gap={3}>
              <FaCode size={22} color="#646cff" />
              <Text>
                Editorul de cod suportă <b>Python, JavaScript, C++ și Java</b>{" "}
                cu rulare sandboxed în containere Docker, pentru o experiență
                sigură și rapidă.
              </Text>
            </Flex>

            <Text color="gray.400" fontSize="sm" pt={4}>
              Tot progresul este salvat automat. Fii activ, rezolvă provocări și
              devino legendar în CodeFest!
            </Text>
          </VStack>
        </Box>
        <Footer />
      </Flex>
    </Box>
  );
};

export default HelpMe;
