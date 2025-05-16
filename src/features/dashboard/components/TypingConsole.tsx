import { Box, Button, Text, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const steps = [
  "creare cont",
  "autentificare",
  "participare la evenimente",
  "invatare continua",
  "trimitere solutii",
  "verificare clasament",
  "primeste insigne",
  "socializare",
  "distractie",
];

const TypingConsole = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < steps.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsRunning(false);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleRun = () => {
    setIsRunning(true);
  };

  return (
    <Box
      w={{ base: "90%", md: "400px" }}
      h="300px"
      border="2px solid #646cff"
      borderRadius="md"
      overflow="hidden"
      fontFamily="mono"
      boxShadow="0 0 10px rgba(100, 108, 255, 0.5)"
    >
      {/* Header + buton Run */}
      <HStack bg="#646cff" color="white" px={4} py={2} justify="space-between">
        <Text as="span">{">"} cum-functioneaza</Text>
        <Button size="sm" colorScheme="whiteAlpha" onClick={handleRun}>
          Run ▶
        </Button>
      </HStack>

      {/* Consola */}
      <Box
        bg="#0a0a0a"
        color="#646cff"
        h="400px"
        p={4}
        overflowY="auto"
        whiteSpace="pre-wrap"
      >
        <Text as="span">
          {steps.slice(0, visibleCount).map((step, i) => (
            <Text key={i}>&gt; {step}</Text>
          ))}
        </Text>
      </Box>
    </Box>
  );
};

export default TypingConsole;
