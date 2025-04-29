import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAPI } from "../services/AuthService";
import { Flex, Box, Heading, Input, Button, Text } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/checkbox";
import { getCurrentEvent } from "../services/EventService";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [terminal, setTerminal] = useState<boolean>(false);
  const [loginStatus, setLoginStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [booting, setBooting] = useState<boolean>(false);
  //const [eventName, setEventName] = useState<string>("");
  const [displayText, setDisplayText] = useState<string>("CodeFest");
  const [fontFamily, setFontFamily] = useState<string>("Nura");
  const [glitching, setGlitching] = useState<boolean>(false);



  const navigate = useNavigate();

  const bootMessages = [
    "Waking up the servers...",
    "Setting up your dashboard tools...",
    "Almost ready...",
    "Get ready to code!",
  ];

  const [bootIndex, setBootIndex] = useState<number>(0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Apelul API pentru login
      const response = await loginAPI(username, password);
      if (response) {
        setBooting(true);

        setTimeout(() => {
          setLoginStatus("success");
          toast.success("Login successful!");
          navigate("/dashboard");
        }, 2000);
      } else {
        setTimeout(() => {
          setLoginStatus("error");
        }, 1500);
      }
    } catch (error: any) {
      setTimeout(() => {
        toast.error("Login failed. Please check your credentials.");
      }, 1500);
    }
  };

  const generateRandomText = (length: number) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+±";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getCurrentEvent();
        console.log("Current event:", event[0].name);
      } catch (error) {
        console.error("Eroare la eveniment:", error);
      }
    };

    fetchEvent();

    let randomGlitchTime = Math.floor(Math.random() * 10000) + 3000;

    const interval = setInterval(() => {
      setGlitching(true);
      setFontFamily("VT323");

      const glitchInterval = setInterval(() => {
        setDisplayText(generateRandomText(8));
      }, 100);

      setTimeout(() => {
        clearInterval(glitchInterval);
        setGlitching(false);
        setDisplayText("CodeFest");
        setFontFamily("Nura");
      }, 1000);
    }, randomGlitchTime);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!booting) return;

    const interval = setInterval(() => {
      setBootIndex((prev) => {
        if (prev < bootMessages.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [booting]);

  return (
    <Box>
      <Box
        position={"absolute"}
        top={8}
        left={12}
        fontFamily={fontFamily}
        fontWeight={900}
        fontSize={glitching ? "2xl" : "5xl"}
        color={"#646cff"}
        animation={
          glitching ? "smallShake 0.5s infinite" : "pulseGlow 2s infinite"
        }
      >
        {displayText}
      </Box>
      <Flex
        height={"100vh"}
        alignItems="center"
        justifyContent="center"
        bg={"1a1a1a"}
        direction={"row"}
        gap={10}
        px={10}
      >
        <Box textAlign={"center"} border={"2px solid black"} flex={1}>
          Salut!
        </Box>
        <Box p={8} mt={8} flex={1} /*</Flex>border="2px solid black"*/>
          <Heading
            fontFamily={"Nura"}
            fontWeight={900}
            fontSize={"5xl"}
            mb={8}
            textAlign={"center"}
          >
            Welcome Back!
          </Heading>
          <form
            onSubmit={handleLogin}
            style={{
              width: "300px",
              margin: "0 auto",
            }}
          >
            <Box mb="4">
              <label htmlFor="username" style={{ color: "white" }}>
                Username:
              </label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onClick={() => setTerminal(true)}
                mt="2"
                bg="gray.700"
                focusRingColor={"purple.500"}
                color="white"
              />
            </Box>
            <Box mb="6">
              <label htmlFor="password" style={{ color: "white" }}>
                Password:
              </label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onClick={() => setTerminal(true)}
                mt="2"
                bg="gray.700"
                focusRingColor={"purple.500"}
                color="white"
              />
            </Box>
            <Box mb="4" textAlign={"center"}>
              <Checkbox
                colorScheme="purple"
                isChecked={rememberMe}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRememberMe(e.target.checked);
                  console.log("Remember Me toggled:", e.target.checked);
                }}
              >
                Remember me
              </Checkbox>
            </Box>
            <Button
              type="submit"
              bg={"#646cff"}
              width="full"
              _hover={{ bg: "#c800ff" }}
            >
              Login
            </Button>
          </form>

          <Box
            mt="6"
            w="100%"
            minH="160px"
            bg="#0a0a0a"
            color="#646cff"
            p="4"
            borderRadius="md"
            fontFamily="'Fira Code', monospace"
            fontSize="sm"
            whiteSpace="pre-wrap"
            position="relative"
            transition="all 0.5s ease-in-out" // adaugăm tranziție lină
            opacity={terminal ? 1 : 0}
            transform={terminal ? "translateY(0)" : "translateY(10px)"}
            visibility={terminal ? "visible" : "hidden"}
          >
            {">"} login {username || "[username]"}{" "}
            {password ? "*".repeat(password.length) : "[password]"}{" "}
            {rememberMe ? "--save" : ""}
            <Box>
              {booting &&
                bootMessages.slice(0, bootIndex).map((msg, idx) => (
                  <Text key={idx}>
                    {">"} {msg}
                  </Text>
                ))}
            </Box>
            {loginStatus === "error" && (
              <Text>{">"} Login failed! Please try again...</Text>
            )}
            <Box
              as="span"
              bg="#646cff"
              ml={"2px"}
              width="8px"
              height="18px"
              display="inline-block"
              animation="blink 1s step-start infinite"
            />
          </Box>
        </Box>
        <Box textAlign={"center"} border={"2px solid black"} flex={1}>
          Al treilea card! Viitoare evenimente
        </Box>
        <style>
          {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes blink {
            50% {
              opacity: 0;
            }
          }
          @keyframes pulseGlow {
            0% {
              text-shadow: 0 0 5px #646cff, 0 0 10px #646cff;
            }
            50% {
              text-shadow: 0 0 10px #535bf2;, 0 0 15px #535bf2;;
            }
            100% {
              text-shadow: 0 0 5px #646cff, 0 0 10px #646cff;
            }
          }
          @keyframes smallShake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            50% { transform: translateX(2px); }
            75% { transform: translateX(-2px); }
            100% { transform: translateX(0); }
          }
        `}
        </style>
      </Flex>
    </Box>
  );
};

export default Login;
