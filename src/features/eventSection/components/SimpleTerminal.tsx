import { useState } from "react";
import { Box, Text, Input } from "@chakra-ui/react";
import { Event } from "../hooks/useEvents";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SimpleTerminal.css";
import { useLeaderboardComplete } from "../../leaderboard/hooks/useLeaderboardComplete";

interface SimpleTerminalProps {
  currentEvent: Event | null;
  pastEvents: Event[];
  user: {
    userName: string;
    email: string;
  } | null;
}

interface HistoryEntry {
  terminalType: string;
  command: string;
  output: string;
}

const SimpleTerminal: React.FC<SimpleTerminalProps> = ({
  currentEvent,
  pastEvents,
  user,
}) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const navigate = useNavigate();

  const { firstTen } = useLeaderboardComplete();

  const terminalWindowType = [
    `${user?.userName} -- - zsh -- @CodeFest`,
    `${user?.userName}@linux-machine:~$ @CodeFest`,
    `Command Prompt - ${user?.userName} - CodeFest`,
    `PowerShell - ${user?.userName} - CodeFest`,
  ];

  const terminalType = [
    `(base) ${user?.userName}@CodeFest ~ % `,
    `${user?.userName}@linux-machine:~$ `,
    `C:\\Users\\${user?.userName}> `,
    `PS C:\\Users\\${user?.userName}> `,
  ];

  const randomIndex = useMemo(() => {
    return Math.floor(Math.random() * terminalWindowType.length);
  }, []);

  console.log("Random terminal" + terminalType[randomIndex]);

  const handleCommand = (command: string) => {
    const args = command.trim().split(" ");
    const cmd = args[0];
    const terminalPrompt = terminalType[randomIndex];
    let output = "";

    switch (cmd) {
      case "help":
        output =
          "Comenzi disponibile:\n" +
          "- help: Afiseaza comenzile disponibile\n" +
          "- ls: Listeaza toate evenimentele\n" +
          "- cd [nume]: Navigheaza catre provocarile evenimentului dorit\n" +
          "- echo [nume]: Afiseaza detalii despre un eveniment\n" +
          "- --version: Afiseaza evenimentul care este in desfasurare\n" +
          "- leaderboard: Afiseaza top 10 jucatori\n" +
          "- clear: Curata terminalul";
        break;

      case "ls":
        output = pastEvents.map((e) => e.name).join("\n");
        break;
      case "echo":
        const nameToFind = args.slice(1).join(" ");
        const event = pastEvents.find((e) => e.name === nameToFind);
        if (event) {
          output = JSON.stringify(event, null, 2);
        } else {
          output = `Evenimentul "${nameToFind}" nu a fost gasit.`;
        }
        break;
      case "--version":
        if (currentEvent) {
          output = JSON.stringify(currentEvent, null, 2);
        } else {
          output = `Nu exista un eveniment curent.`;
        }
        break;
      case "leaderboard":
        const maxNameLength = 15;
        const maxScoreLength = 6;

        output =
          "[RANK]  " +
          "USER".padEnd(maxNameLength) +
          "SCORE".padStart(maxScoreLength) +
          "\n" +
          "-".repeat(30) +
          "\n" +
          firstTen
            .map((entry) => {
              return (
                `[${entry.rank.toString().padStart(2, "0")}]  ` +
                entry.username.padEnd(maxNameLength) +
                entry.score.toString().padStart(maxScoreLength)
              );
            })
            .join("\n");
        break;

      case "cd":
        const dirName = args.slice(1).join(" ");
        const targetEvent = pastEvents.find((e) => e.name === dirName);
        if (targetEvent) {
          navigate(`/event/${encodeURIComponent(targetEvent.name)}`, {
            state: { event: targetEvent },
          });
          return;
        } else {
          output = `Evenimentul "${dirName}" nu a exista.`;
        }
        break;
      case "clear":
        output = "";
        setHistory([]);
        return;

      default:
        output = `Comanda necunoscuta: ${cmd}`;
    }

    setHistory((prev) => [
      ...prev,
      { terminalType: terminalPrompt, command, output },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <Box
      w={{ base: "90%", md: "750px" }}
      borderRadius="lg"
      overflow="hidden"
      animation={"fadeIn 0.5s ease-in-out, pulseGlowBox 2s ease infinite"}
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
        {terminalWindowType[randomIndex]}
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
        minH="300px"
        maxH="300px"
        overflowY="auto"
      >
        {history.map((item, index) => (
          <Box key={index}>
            <Text>
              {item.terminalType} {item.command}
            </Text>

            <Text whiteSpace="pre-wrap">{item.output}</Text>
          </Box>
        ))}

        <Box display="flex">
          <Text py={2}>{terminalType[randomIndex]} </Text>
          <Input
            w={"40%"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            border={"none"}
            _active={{ border: "none" }}
            ml={2}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SimpleTerminal;
