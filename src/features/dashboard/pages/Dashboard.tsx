import { Box, Text, VStack, HStack, Button } from "@chakra-ui/react";
import Navbar from "../../../components/Navbar/Navbar";
import "../styles/style.css";
import TypingConsole from "../components/TypingConsole";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import Stats from "../components/Stats";
import Tips from "../components/Tips";
import SmallLeaderboard from "../components/SmallLeaderboard";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box bg="#121212" minH="100vh">
      <Navbar />

      <VStack spaceX={8} spaceY={8} py={36}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          fontFamily="Nura"
          color="whiteAlpha.900"
        >
          Bine ai venit pe CodeFest! Platforma ta zilnica de coding!
        </Text>
        <VStack spaceY={6}>
          <HStack spaceX={12}>
            <VStack spaceY={2}>
              <Stats />
              <Tips />
            </VStack>
            <SmallLeaderboard />
          </HStack>
          <Box
            w={{ base: "90%", md: "500px" }}
            borderRadius="lg"
            overflow="hidden"
            animation={`pulseGlowCard 1s ease-in-out infinite`}
          >
            <Box
              bg="#646cff"
              px={4}
              py={2}
              fontFamily="mono"
              color="white"
              fontSize="lg"
              fontWeight={"900"}
              textAlign={"center"}
            >
              Curios? Foarte bine!
            </Box>
            <Box bg="white" px={8} py={4} color="black" fontFamily="mono">
              <Text fontSize="md" textAlign="center">
                Mergi catre challenge-uri!{" "}
                <Button
                  bgColor="#646cff"
                  onClick={() => navigate("/challenges")}
                  _hover={{ bgColor: "#535bf2" }}
                  _active={{ opacity: 0.8 }}
                >
                  {">_ challenges"}
                </Button>
              </Text>
            </Box>
          </Box>
          <TypingConsole />
        </VStack>
      </VStack>
      <Footer />
    </Box>
  );
};

export default Dashboard;
