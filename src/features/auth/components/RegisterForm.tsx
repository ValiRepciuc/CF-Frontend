import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/checkbox";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/useAuth";

interface Props {
  registerMessages: string[];
  register: boolean;
  setRegister: (b: boolean) => void;
  terminal: boolean;
  setTerminal: (t: boolean) => void;
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<Props> = ({
  registerMessages,
  register,
  setRegister,
  terminal,
  setTerminal,
  onSwitchToLogin,
}) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [bootIndex, setBootIndex] = useState(0);
  const [registerStatus, setRegisterStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>/?]{8,}$/.test(
      password
    );

  const { registerUser } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!isValidEmail(email)) {
      toast.error("Adresa de email nu este validă.");
      hasError = true;
    }

    if (!isValidPassword(password)) {
      toast.error(
        "Parola trebuie să aiba cel putin 8 caractere, o majuscula, o minuscula, un caracter special si o cifra!"
      );
      hasError = true;
    }

    if (password !== confirmPassword) {
      toast.error("Parolele nu se potrivesc.");
      hasError = true;
    }
    if (hasError) {
      return;
    }
    try {
      const response = await registerUser(email, username, password);
      if (response) {
        setRegister(true);

        setTimeout(() => {
          setRegisterStatus("success");
          toast.success("Inregistrare cu succes!");
          navigate("/");
        }, 2000);
      } else {
        setTimeout(() => {
          setRegisterStatus("error");
        }, 1500);
      }
    } catch (error: any) {
      setTimeout(() => {
        toast.error("Inregistrarea a esuat. Verificati.");
      }, 1500);
    }
  };

  useEffect(() => {
    if (!register) return;

    const interval = setInterval(() => {
      setBootIndex((prev) => {
        if (prev < registerMessages.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [register]);

  useEffect(() => {
    if (confirmPassword === "") return;
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

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
        onSubmit={handleRegister}
        style={{
          width: "300px",
          margin: "0 auto",
        }}
      >
        <Box mb="4">
          <label htmlFor="email" style={{ color: "white" }}>
            Email:
          </label>
          <Input
            type="text"
            id="username"
            fontFamily={"Inter"}
            fontSize={"md"}
            fontWeight={"bold"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClick={() => setTerminal(true)}
            mt="2"
            bg="gray.700"
            focusRingColor={"purple.500"}
            color="white"
          />
        </Box>
        <Box mb="4">
          <label htmlFor="username" style={{ color: "white" }}>
            Username:
          </label>
          <Input
            type="text"
            id="username"
            fontFamily={"Inter"}
            fontSize={"md"}
            fontWeight={"bold"}
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
            fontFamily={"Inter"}
            fontSize={"md"}
            fontWeight={"bold"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClick={() => setTerminal(true)}
            mt="2"
            bg="gray.700"
            focusRingColor={"purple.500"}
            color="white"
          />
          <Box mb="4">
            <label htmlFor="password" style={{ color: "white" }}>
              Confirm Password:
            </label>
            <Input
              type="password"
              id="confirmPassword"
              fontFamily={"Inter"}
              fontSize={"md"}
              fontWeight={"bold"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onClick={() => setTerminal(true)}
              mt="2"
              bg="gray.700"
              focusRingColor={"purple.500"}
              color="white"
            />
          </Box>
          <Box mb={4} textAlign={"center"} minH={"22px"}>
            {!passwordMatch && confirmPassword && (
              <Text color="red.500" fontSize="sm">
                Parolele nu se potrivesc!
              </Text>
            )}
          </Box>
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
          onClick={() => setTerminal(true)}
          disabled={
            !email ||
            !username ||
            !password ||
            !confirmPassword ||
            !passwordMatch
          }
        >
          Register
        </Button>
        <Text
          mt={4}
          color="gray.400"
          fontSize="sm"
          textAlign="center"
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
          onClick={onSwitchToLogin}
        >
          Ai deja cont? Autentifică-te
        </Text>
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
        {">"} register {email || "[email]"} {username || "[username]"}{" "}
        {password ? "*".repeat(password.length) : "[password]"}{" "}
        {rememberMe ? "--save" : ""}
        {register &&
          registerMessages.slice(0, bootIndex).map((msg, idx) => (
            <Text key={idx}>
              {">"} {msg}
            </Text>
          ))}
        {registerStatus === "error" &&
          "\n>" + " Inregistrarea a esuat! Te rog incearca din nou..."}
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

export default RegisterForm;
