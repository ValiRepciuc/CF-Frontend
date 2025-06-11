import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import "../../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useEvents } from "../../features/eventSection/hooks/useEvents";
import NotificationDropDown from "./NotificationDropDown";

const codeSnippets = [
  "let y = 2025;",
  "const start = 'CodeFest';",
  "int year = 2025;",
  "if (dev) { code(); }",
  "#include <codefest.h>",
  "y: number = 2025;",
  "const isLoggedIn = true;",
  "type Event = 'CodeFest2025';",
  "print('Hello, World 2025')",
  "var year = 0x7E9;",
  "currentDate.setFullYear(2025);",
  "// TODO: Survive CodeFest 2025",
  "echo 'Booting CodeFest 2025...'",
];

const Navbar = () => {
  const NAV_COMMANDS = [
    { cmd: ">_ events()", action: () => navigate("/events") },
    {
      cmd: ">_ challenges()",
      action: () => {
        if (currentEvent) {
          navigate(`/event/${currentEvent.name}`, {
            state: { event: currentEvent },
          });
        }
      },
    },
    { cmd: ">_ leaderboard()", action: () => navigate("/leaderboard") },
    { cmd: ">_ messages.open()", action: () => navigate("/messages") },
    { cmd: ">_ help()", action: () => navigate("/how-it-works") },
  ];

  const { currentEvent } = useEvents();

  useEffect(() => {
    if (currentEvent) {
      console.log("Am primit currentEvent:", currentEvent.name);
    }
  }, [currentEvent]);

  const [index, setIndex] = useState(
    Math.floor(Math.random() * codeSnippets.length)
  );
  const [animate, setAnimate] = useState(false);

  const handleSnippetClick = () => {
    let newIndex = index;
    while (newIndex === index) {
      newIndex = Math.floor(Math.random() * codeSnippets.length);
    }
    setAnimate(true);
    setIndex(newIndex);

    setTimeout(() => setAnimate(false), 300);
  };

  const { user, logoutUser, isLoggedIn } = useAuth();
  console.log(user);
  console.log(isLoggedIn());

  const navigate = useNavigate();

  return (
    <Box
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bgColor={"#646cff"}
      color={"whiteAlpha.900"}
      py={2}
      px={{ base: 4, md: 8 }}
    >
      <Flex justify="space-between" align="center">
        <Logo
          displayText={"Codefest"}
          codeText={codeSnippets[index]}
          onCodeClick={handleSnippetClick}
          animate={animate}
        />
        <HStack spaceX={4}>
          {NAV_COMMANDS.map((item) => (
            <Button
              key={item.cmd}
              onClick={item.action}
              bgColor="#646cff"
              _hover={{ bgColor: "#535bf2" }}
              _active={{ opacity: 0.8 }}
              fontFamily="mono"
              fontSize="sm"
            >
              {item.cmd}
            </Button>
          ))}
        </HStack>

        <Box>
          {isLoggedIn() ? (
            <>
              <HStack spaceX={8} align="center">
                <NotificationDropDown />
                <Button
                  onClick={logoutUser}
                  bgColor={"#646cff"}
                  _hover={{ bgColor: "#535bf2;" }}
                  _active={{ opacity: 0.8 }}
                  fontWeight={900}
                >
                  Logout ({user?.userName}){" "}
                </Button>
              </HStack>
            </>
          ) : (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
