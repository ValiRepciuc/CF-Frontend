import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useMemo } from "react";

interface TerminalBoxProps {
  user: {
    userName: string;
    email: string;
  } | null;
  eventsName: string[];
}

const TerminalBox: React.FC<TerminalBoxProps> = ({ user, eventsName }) => {
  const [activeCommand, setActiveCommand] = useState(false);

  const terminalType = [
    `(base) ${user?.userName}@CodeFest ~ % `,
    `${user?.userName}@linux-machine:~$ `,
    `C:\\Users\\${user?.userName}> `,
    `PS C:\\Users\\${user?.userName}> `,
  ];

  const randomType = useMemo(() => {
    return terminalType[Math.floor(Math.random() * terminalType.length)];
  }, []);

  return (
    <Box
      w={{ base: "90%", md: "500px" }}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="0 0 15px #646cff66"
    >
      <Box
        bg="#646cff"
        px={4}
        py={2}
        fontFamily="mono"
        color="white"
        fontSize="sm"
        textAlign={"center"}
      >
        {user?.userName + "-- - zsh -- CodeFest"}
      </Box>
      <Box
        bg="white"
        px={6}
        py={4}
        color="whiteAplha.900"
        borderLeft={"2px solid #646cff"}
        borderBottom={"2px solid #646cff"}
        borderRight={"2px solid #646cff"}
        borderBottomRadius={"12px"}
        bgColor={"#121212"}
        fontFamily="mono"
        minH="100px"
      >
        <Text>
          {randomType}
          <Button
            bgColor={"inherit"}
            onClick={() => setActiveCommand(true)}
            {...(!activeCommand
              ? { animation: "pulseGlow 0.4s ease infinite" }
              : { animation: "none" })}
            _hover={{ bgColor: "#646cff" }}
            _active={{ opacity: 0.8 }}
          >
            ls
          </Button>
        </Text>
        <Flex wrap="wrap" gap={2}>
          {activeCommand ? (
            <>
              {eventsName.map((event, idx) => (
                <Button
                  p={0}
                  key={idx}
                  flexBasis="48%"
                  maxW="50%"
                  size="sm"
                  color="whiteAlpha.900"
                  border={"none"}
                  variant="outline"
                  _hover={{ bg: "#646cff", color: "white" }}
                >
                  {event}
                </Button>
              ))}
            </>
          ) : null}
        </Flex>
      </Box>
    </Box>
  );
};

export default TerminalBox;
