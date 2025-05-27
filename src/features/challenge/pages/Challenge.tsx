import { Box, Text, Flex, VStack, HStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useChallengeContext } from "../../../context/useChallenge";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import EditorComponent from "../components/editor";
import { useEffect } from "react";
import TestCaseCard from "../components/testCaseCard";
import { useTestCases } from "../hooks/useTestCase";
import { useUserSubmission } from "../hooks/useSubmission";

const Challenge = () => {
  const { id } = useParams();
  const { challenges, setChallenges } = useChallengeContext();

  const challenge = challenges.find((c) => c.id === id);

  const { testCases } = useTestCases(id || "");

  const { hasPassed } = useUserSubmission(id || "");

  console.log("Passsedd!!:", hasPassed);

  useEffect(() => {
    if (challenges.length === 0) {
      const fromStorage = localStorage.getItem("challenges");
      if (fromStorage) {
        setChallenges(JSON.parse(fromStorage));
      }
    }
  }, []);

  if (!challenge) {
    return (
      <Box p={10} fontFamily="mono" color="red.300">
        Challenge not found for ID {id}.
        <br />
        Te rugăm să accesezi challenge-ul din pagina evenimentului.
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      <Flex direction="column" pt={36} minH="100vh">
        <Flex direction={["column", "row"]} gap={2} pl={"8"}>
          <Box w={["100%", "40%"]} fontFamily={"Inter"}>
            <VStack align="start" gap={4}>
              <Text fontSize="3xl" fontWeight="bold">
                Challenge:{" "}
                <Text as="span" animation={"pulseGlow 1s infinite ease-in-out"}>
                  {challenge.title}
                </Text>
              </Text>
              <Text fontSize="xl" fontWeight={"bold"} whiteSpace="pre-wrap">
                Descriere: {`\n\n`}
                {challenge.description}
              </Text>
              <TestCaseCard testCases={testCases} />
            </VStack>
          </Box>

          <Box w={["100%", "60%"]}>
            <EditorComponent
              initialCode={`Scrie aici codul tau...`}
              challengeId={id}
              isDisabled={hasPassed}
            />
          </Box>
        </Flex>
        <Footer />
      </Flex>
    </Box>
  );
};

export default Challenge;
