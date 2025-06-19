import { Box, Text, Flex, SimpleGrid } from "@chakra-ui/react";
import Navbar from "../../../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Event } from "../../eventSection/hooks/useEvents";
import { useChallenges } from "../hooks/useChallenges";
import challengeCard from "../components/challengeCard";
import Footer from "../../../components/Footer/Footer";
import { useChallengeContext } from "../../../context/useChallenge";

const EventDetails = () => {
  const location = useLocation();
  const event = (location.state as { event: Event })?.event;

  const { currentChallenges } = useChallenges(event?.id || "");

  const { setChallenges } = useChallengeContext();

  useEffect(() => {
    if (currentChallenges.length > 0) {
      setChallenges(currentChallenges);
      localStorage.setItem("challenges", JSON.stringify(currentChallenges));
    }
  }, [currentChallenges]);

  useEffect(() => {
    if (event?.id) {
    }
  }, [event]);

  return (
    <Box m={"0 auto"}>
      <Navbar />
      <Flex
        direction="column"
        minH="100vh"
        pt={36}
        animation={"fadeIn 0.5s ease-in-out"}
      >
        <Text
          textAlign={"center"}
          fontSize={"4xl"}
          fontFamily={"Inter"}
          fontWeight={900}
          animation={"fadeIn 0.7s ease-in-out"}
        >
          Mai jos ai challenge-urile pentru evenimentul{" "}
          <Text
            display={"inline-block"}
            animation={"pulseGlow 1s infinite ease-in-out"}
          >
            {event?.name}
          </Text>
        </Text>
        <Text
          textAlign={"center"}
          fontFamily={"Inter"}
          fontSize={"3xl"}
          fontWeight={900}
          mb={8}
        >
          Apasa pe titlu pentru a incepe challenge-ul!
        </Text>
        <Text
          textAlign="center"
          fontSize="sm"
          fontWeight="medium"
          fontFamily="mono"
          color="gray.300"
          maxW="800px"
          mx="auto"
          px={4}
        >
          ⚠️ Ține minte! Fiecare provocare are un punctaj dinamic care{" "}
          <strong>scade cu 1</strong> pentru fiecare rezolvare trimisă. Poți
          obține un{" "}
          <span style={{ color: "#646cff", fontWeight: "bold" }}>
            bonus de viteză
          </span>
          :<strong> +10%</strong> dacă reușești din prima, sau{" "}
          <strong>+5%</strong> dacă reușești din a doua sau a treia încercare.
          Fii rapid și inspirat! 🚀
        </Text>
        <Box
          color="green.300"
          fontFamily="mono"
          fontSize="sm"
          p={4}
          borderRadius="md"
          whiteSpace="pre-wrap"
          animation={"fadeIn 1s ease-in-out"}
          mt={16}
        >
          <SimpleGrid columns={[1, 2, 3]} gap={4}>
            {currentChallenges.map((challenge, index) => (
              <Box key={index}>
                {challengeCard({
                  id: challenge.id,
                  day: index + 1,
                  title: challenge.title,
                  startDate: challenge.date,
                })}
              </Box>
            ))}
          </SimpleGrid>
        </Box>
        <Footer />
      </Flex>
    </Box>
  );
};

export default EventDetails;
