import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/checkbox";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAPI } from "../services/AuthService";

interface Props {
  bootMessages: string[];
  booting: boolean;
  setBooting: (b: boolean) => void;
  terminal: boolean;
  setTerminal: (t: boolean) => void;
}

const LoginForm: React.FC<Props> = ({
  bootMessages,
  booting,
  setBooting,
  terminal,
  setTerminal,
}) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [bootIndex, setBootIndex] = useState(0);
  const [loginStatus, setLoginStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

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
        {booting &&
          bootMessages.slice(0, bootIndex).map((msg, idx) => (
            <Text key={idx}>
              {">"} {msg}
            </Text>
          ))}
        {loginStatus === "error" && ">" + "Login failed! Please try again..."}
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
  );
};

export default LoginForm;
