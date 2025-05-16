import { Box, Text } from "@chakra-ui/react";
import { useStats } from "../hooks/useStats";
import CountUp from "react-countup";

const Stats = () => {
  const { eventsCount, submissionsCount } = useStats();

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
        {">_ stats"}
      </Box>
      <Box
        bg="white"
        px={6}
        py={4}
        color="black"
        fontFamily="mono"
        minH="100px"
      >
        <Text>&gt; users: 1,254</Text>
        <Text>
          &gt; submissions: <CountUp end={submissionsCount} duration={3} />{" "}
        </Text>
        <Text>
          &gt; events: <CountUp end={eventsCount} duration={2} />
        </Text>
      </Box>
    </Box>
  );
};

export default Stats;
