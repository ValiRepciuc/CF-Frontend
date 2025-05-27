import { Box, Text, VStack } from "@chakra-ui/react";
import { TestCase } from "../hooks/useTestCase";

interface Props {
  testCases: TestCase[];
}

const testCaseCard = ({ testCases }: Props) => {
  return (
    <VStack align="start" gap={4} fontFamily={"Inter"}>
      <Text fontSize="xl" fontWeight="bold">
        Cazuri de test:
      </Text>
      {testCases.map((tc, index) => (
        <Box ml={2} key={index} p={4} borderRadius="md" w="100%">
          <Text fontSize="lg" fontWeight="bold">
            <strong>Date intrare:</strong>{" "}
            <Text as="span" color="#646cff">
              {tc.input}
            </Text>
          </Text>
          <Text>
            <strong>Rezultat asteptat:</strong>{" "}
            <Text as="span" color="#646cff">
              {tc.expectedOutput}
            </Text>
          </Text>
        </Box>
      ))}
    </VStack>
  );
};

export default testCaseCard;
