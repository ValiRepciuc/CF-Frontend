import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAPI } from "../services/AuthService";
import { Flex, Box, Heading, Input, Button } from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Apelul API pentru login
      const response = await loginAPI(username, password);
      if (response) {
        toast.success("Login successful!");
        // Navigăm către o pagină de dashboard sau homepage
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <Flex
      height={"100vh"}
      alignItems="center"
      justifyContent="center"
      bg={"1a1a1a"}
    >
      <Box p={12} border="2px solid black">
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
              mt="2"
              bg="gray.700"
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
              mt="2"
              bg="gray.700"
              focusRingColor={"purple.500"}
              color="white"
            />
          </Box>
          <Button
            type="submit"
            colorScheme="purple"
            width="full"
            _hover={{ bg: "#c800ff" }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
