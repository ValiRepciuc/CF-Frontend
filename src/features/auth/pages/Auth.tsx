import { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";
import GlitchLogo from "../components/GlitchLogo";
import CurrentEventCard from "../components/CurrentEventCard";
import UpcomingEventCard from "../components/UpcomingEventCard";
import { useGlitch } from "../hooks/useGlitch";
import { useEvents } from "../hooks/useEvents";
import "../styles/authAnimations.css";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const [terminal, setTerminal] = useState<boolean>(false);
  const [booting, setBooting] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const toogleForm = () => setIsRegistered((prev) => !prev);

  const bootMessages = [
    "Waking up the servers...",
    "Setting up your dashboard tools...",
    "Almost ready...",
    "Get ready to code!",
  ];
  const registerMessages = [
    "Creating your account...",
    "Setting up your profile...",
    "Almost there...",
    "Welcome aboard!",
  ];

  const { displayText, fontFamily, glitching } = useGlitch();
  const { currentEvent, nextEvent, calculateEventProgress } = useEvents();

  return (
    <Box>
      <GlitchLogo
        displayText={displayText}
        fontFamily={fontFamily}
        glitching={glitching}
      />
      <Flex
        height={"100vh"}
        alignItems="center"
        justifyContent="center"
        bg={"1a1a1a"}
        direction={"row"}
        gap={10}
        px={10}
      >
        <CurrentEventCard
          currentEvent={currentEvent}
          calculateEventProgress={calculateEventProgress}
        />
        {isRegistered ? (
          <LoginForm
            bootMessages={bootMessages}
            booting={booting}
            setBooting={setBooting}
            terminal={terminal}
            setTerminal={setTerminal}
            onSwitchToRegister={toogleForm}
          />
        ) : (
          <RegisterForm
            registerMessages={registerMessages}
            register={register}
            setRegister={setRegister}
            terminal={terminal}
            setTerminal={setTerminal}
            onSwitchToLogin={toogleForm}
          />
        )}

        <UpcomingEventCard nextEvent={nextEvent} />
      </Flex>
    </Box>
  );
};

export default Login;
