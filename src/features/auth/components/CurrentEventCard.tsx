import { Badge, Box, Progress, Text } from "@chakra-ui/react";

interface CurrentEventCardProps {
  currentEvent: {
    name: string;
    startDate: string;
    endDate: string;
  } | null;
  calculateEventProgress: (event: any) => number;
}

const CurrentEventCard: React.FC<CurrentEventCardProps> = ({
  currentEvent,
  calculateEventProgress,
}) => {
  if (!currentEvent) return null;

  return (
    <Box
      bgGradient="linear(to-b, #0a0a0a, #1a1a1a)"
      textAlign={"center"}
      border="2px solid #646cff"
      boxShadow="0 0 15px #646cff66"
      borderRadius="lg"
      flex={1}
      p={8}
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "0 0 20px #646cff88",
        transform: "scale(1.02)",
      }}
    >
      <Badge
        mt={1}
        mb={2}
        bg={"#646cff"}
        borderRadius="full"
        px={3}
        py={1}
        fontSize="0.7rem"
        letterSpacing="wider"
      >
        Live Now
      </Badge>
      <Text fontFamily={"Nura"} fontSize="xl" fontWeight={900} mb={6}>
        Evenimentul curent este: {currentEvent.name}
      </Text>
      <Text
        fontSize="2xl"
        fontWeight={900}
        mb={2}
        color="#646cff"
        textAlign="center"
      >
        Progress:
      </Text>
      {currentEvent && (
        <>
          <Progress.Root
            value={calculateEventProgress(currentEvent)}
            max={100}
            size="sm"
            style={{
              backgroundColor: "#1a1a1a",
              height: "8px",
            }}
          >
            <Progress.Track
              style={{
                backgroundColor: "white",
                borderRadius: "999px",
              }}
            >
              <Progress.Range
                style={{
                  backgroundColor: "#646cff",
                  transition: "width 0.6s ease",
                  borderRadius: "999px",
                }}
              />
            </Progress.Track>
          </Progress.Root>
          <Text my={8} fontWeight={700} fontSize={"lg"}>
            Start:{" "}
            {new Date(currentEvent.startDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </Text>
          <Text fontWeight={700} fontSize={"lg"}>
            Sfarsit:{" "}
            {new Date(currentEvent.endDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </Text>
        </>
      )}
      <Text fontWeight={700} fontSize="lg">
        Start: {new Date(currentEvent.startDate).toLocaleDateString("en-GB")}
      </Text>
      <Text fontWeight={700} fontSize="lg">
        Sfarsit: {new Date(currentEvent.endDate).toLocaleDateString("en-GB")}
      </Text>
    </Box>
  );
};

export default CurrentEventCard;
