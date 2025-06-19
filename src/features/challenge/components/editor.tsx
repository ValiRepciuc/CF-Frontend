"use client";

import Editor from "@monaco-editor/react";
import { useLanguage } from "../hooks/useLanguage";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Spinner,
  Text,
  VStack,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Select as ChakraSelect } from "@chakra-ui/select";
import { useSubmission } from "../hooks/useSubmission";
import { AnimatePresence, motion } from "framer-motion";
import { useLeaderboardComplete } from "../../leaderboard/hooks/useLeaderboardComplete";

interface EditorProps {
  initialCode: string;
  challengeId?: string;
  isDisabled?: boolean;
}

const editor = ({ initialCode, challengeId, isDisabled }: EditorProps) => {
  const { languages } = useLanguage();
  const [language, setLanguage] = useState("");
  const [languageId, setLanguageId] = useState("");
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [isOutputVisible, setIsOutputVisible] = useState(false);

  const { userEntry } = useLeaderboardComplete();

  const { submissionOutput, loadingSubmission, runSubmission } = useSubmission(
    challengeId || "",
    languageId,
    code
  );

  const languageStartUp: Record<string, string> = {
    "c++": `void solve() {
      cout << "Hello, world!";
  }
  `,

    java: `public static void solve() {
      System.out.println("Hello, world!");
  }
  `,

    python: `def solve():
      print("Hello, world!")
  `,

    javascript: `function solve() {
      console.log("Hello, world!");
  }
  `,
  };

  const handleRun = () => {
    runSubmission();
  };

  useEffect(() => {
    if (submissionOutput) {
      setIsOutputVisible(true);
    }
  }, [submissionOutput]);

  return (
    <VStack align="start" width="100%" mt={4}>
      {isDisabled ? (
        <VStack
          gap={2}
          bg="#121212"
          p={5}
          borderRadius="md"
          shadow="md"
          border={"1px solid #646cff"}
          m={"0 auto"}
          fontSize={"xl"}
        >
          <Text fontWeight="bold" color="whiteAlpha.900">
            Ai rezolvat deja acest challenge!
          </Text>
          <Text>
            Esti pe{" "}
            <strong>
              <Text as={"span"} animation={"pulseGlow 1s infinite ease-in-out"}>
                locul {userEntry?.rank}{" "}
              </Text>
            </strong>{" "}
            in clasament
          </Text>
          <Text color="gray.600">
            Utilizator:{" "}
            <strong>
              <Text as={"span"} color={"#646cff"}>
                {userEntry?.username}
              </Text>
            </strong>{" "}
            | Puncte:{" "}
            <strong>
              <Text as={"span"} color={"#646cff"}>
                {userEntry?.score}
              </Text>
            </strong>
          </Text>
        </VStack>
      ) : (
        <Flex w="100%" h="80vh" position={"relative"} flexDirection="column">
          <Box
            w="100%"
            overflow="hidden"
            boxShadow="md"
            border="1px solid #646cff"
            fontFamily="mono"
          >
            <Box bg="#646cff" color="white" fontSize="sm" px={4} py={3}>
              <HStack>
                {">_codeEditor"}
                {loading ? (
                  <Spinner color="blue.300" />
                ) : (
                  <ChakraSelect
                    placeholder="Limbaj"
                    value={language}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      const selected = languages.find(
                        (lang) => lang.name.toLowerCase() === e.target.value
                      );
                      if (selected) {
                        setLanguage(selected.name.toLowerCase());
                        setLanguageId(selected.id);
                      }
                      const startupCode = languageStartUp[selectedValue];
                      if (startupCode) {
                        setCode(startupCode);
                      }
                    }}
                    bg="gray.800"
                    color="whiteAlpha.900"
                    border="1px solid #646cff"
                  >
                    {languages.map((lang) => (
                      <option value={lang.name.toLowerCase()} key={lang.id}>
                        {lang.name}
                      </option>
                    ))}
                  </ChakraSelect>
                )}
                <Button
                  bg="#121212"
                  color="white"
                  _hover={{ bg: "#535bf2" }}
                  onClick={() => {
                    console.log("languageId", languageId);
                    handleRun();
                    console.log("code", code);
                    console.log("language", language);
                  }}
                  disabled={!languageId}
                >
                  Run
                </Button>
              </HStack>
            </Box>
          </Box>
          <Editor
            height="100%"
            width="100%"
            language={language || "plaintext"}
            value={code}
            onChange={(newValue) => setCode(newValue || "")}
            theme="vs-dark"
          />
          {!loadingSubmission && submissionOutput && (
            <AnimatePresence>
              {isOutputVisible && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: "30vh",
                    backgroundColor: "#121212",
                    color: "white",
                    borderTop: "1px solid #646cff",
                    borderLeft: "1px solid #646cff",
                    padding: "1rem",
                    zIndex: 999,
                    overflowY: "auto",
                  }}
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontWeight="bold" fontSize="lg" color="#646cff">
                      Terminal Output
                    </Text>
                    <Button size="sm" onClick={() => setIsOutputVisible(false)}>
                      Close
                    </Button>
                  </Flex>

                  <Text color="#646cff">Status: {submissionOutput.status}</Text>
                  <Text mt={2}>Output:</Text>
                  <Box mt={1} whiteSpace="pre-wrap">
                    {submissionOutput.output}
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </Flex>
      )}
    </VStack>
  );
};

export default editor;
