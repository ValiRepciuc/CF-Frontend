import { Box, Spinner } from "@chakra-ui/react";
import { useLeaderboard } from "../hooks/useLeaderboard";

const SmallLeaderboard = () => {
  const { firstPlace, secondPlace, thirdPlace, isLoading } = useLeaderboard();
  return (
    <Box
      w={{ base: "90%", md: "400px" }}
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
        fontSize="sm"
      >
        {">_ leaderboard"}
      </Box>
      <Box
        bg="white"
        px={6}
        py={4}
        color="black"
        fontFamily="mono"
        minH="100px"
        position={"relative"}
      >
        <Box as="pre" textAlign="left" whiteSpace="pre-wrap">
          {isLoading ? (
            <Spinner color="#646cff" />
          ) : (
            <>
              {`{\n  "clasament": {\n    "primul": "${
                firstPlace?.username ?? "-"
              }",\n    "alDoilea": "${
                secondPlace?.username ?? "-"
              }",\n    "alTreilea": "${thirdPlace?.username ?? "-"}"\n  }\n}`}
            </>
          )}
        </Box>
        <Box
          as="span"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgImage="linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)"
          bgSize="100% 6px"
          pointerEvents="none"
          animation="scanlines 5s linear infinite"
          zIndex={10}
        />
      </Box>
    </Box>
  );
};

export default SmallLeaderboard;
