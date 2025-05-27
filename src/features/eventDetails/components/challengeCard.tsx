import { Box, Text } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface ChallengeCardProps {
  id: string;
  day: number;
  title: string;
  startDate: string;
}

const ChallengeCard = ({ id, day, title, startDate }: ChallengeCardProps) => {
  return (
    <Box
      w="100%"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      border="1px solid #646cff"
      fontFamily="mono"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "0 0 20px #646cff88",
        transform: "scale(1.02)",
      }}
    >
      <Box bg="#646cff" color="white" px={4} py={2} fontSize="sm">
        {`challenge-day-${day}.json`}
      </Box>

      <Box
        bg="#121212"
        color="#646cff"
        px={4}
        py={3}
        whiteSpace="pre-wrap"
        fontSize="sm"
      >
        <Text>{"{"}</Text>
        <Text ml={4}>{`"day": ${day},`}</Text>

        <Text ml={4}>
          {`"title": "`}
          <ChakraLink
            as={RouterLink}
            to={`/challenge/${id}`}
            state={{ challenge: { day, title, startDate } }}
            display="inline"
            cursor="pointer"
            color="purple.700"
            _hover={{ textDecoration: "underline", color: "purple.600" }}
          >
            {title}
          </ChakraLink>
          {`",`}
        </Text>

        <Text ml={4}>{`"startDate": "${startDate}"`}</Text>
        <Text>{"}"}</Text>
      </Box>
    </Box>
  );
};

export default ChallengeCard;
