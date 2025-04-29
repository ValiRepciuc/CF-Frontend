import { Box, Text } from "@chakra-ui/react";

interface UpcomingEventCardProps {
  nextEvent: {
    name: string;
    startDate: string;
    endDate: string;
  } | null;
}

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({ nextEvent }) => {
  return (
    <Box
      textAlign={"center"}
      flex={1}
      bg={"#0a0a0a"}
      color={"#646cff"}
      p={6}
      fontSize={"md"}
      borderRadius="md"
      fontFamily="'Fira Code', monospace"
      minH="160px"
      position={"relative"}
      overflow="hidden"
      _hover={{
        animation: "smallShake 0.4s ease infinite",
      }}
    >
      {nextEvent ? (
        <Box as="pre" textAlign="left" whiteSpace="pre-wrap">
          {`{\n  "upcoming_event": {\n    "name": "${
            nextEvent.name
          }",\n    "start": "${new Date(nextEvent.startDate).toLocaleDateString(
            "en-GB"
          )}",\n    "end": "${new Date(nextEvent.endDate).toLocaleDateString(
            "en-GB"
          )}"\n  }\n}`}
        </Box>
      ) : (
        <Text>Momentan nu există evenimente viitoare.</Text>
      )}
      <Box
        as="span"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bgImage="linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)"
        bgSize="100% 6px"
        pointerEvents="none"
        animation="scanlines 5s linear infinite"
        zIndex={10}
      />
    </Box>
  );
};

export default UpcomingEventCard;
