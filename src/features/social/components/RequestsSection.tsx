import {
  useAcceptFriendshipRequest,
  useGetFriendshipsRequests,
} from "../hooks/useFriendship";
import { useState, useEffect } from "react";
import { Button, Box, Flex, Text } from "@chakra-ui/react";

const RequestSection = () => {
  const { friendshipRequests: initialRequests, loading } =
    useGetFriendshipsRequests();
  const { acceptRequest } = useAcceptFriendshipRequest();
  const [friendshipRequests, setFriendshipRequests] = useState(initialRequests);

  useEffect(() => {
    setFriendshipRequests(initialRequests);
  }, [initialRequests]);

  const handleAccept = async (id: string) => {
    const success = await acceptRequest(id);
    if (success) {
      setFriendshipRequests((prev) => prev.filter((req) => req.id !== id));
    }
  };

  return (
    <Box fontFamily="Inter" p={4} h="100%" overflowY="auto">
      <Flex direction="column" gap={3}>
        {loading ? (
          <Text color="white">Se încarcă cererile...</Text>
        ) : friendshipRequests.length > 0 ? (
          friendshipRequests.map((request) =>
            !request.isAccepted ? (
              <Box
                key={request.id}
                fontFamily="monospace"
                fontSize="md"
                bg="#181818"
                color="white"
                borderRadius="sm"
                p={4}
                mb={4}
                whiteSpace="pre-wrap"
                border="1px solid #646cff50"
              >
                {`{\n`}
                &nbsp;&nbsp;{`"username"`}: "{request.requester.userName}
                ",{`\n`}
                &nbsp;&nbsp;{`"status"`}: "Pending",{`\n`}
                &nbsp;&nbsp;{`"accept"`}:{" "}
                <Button
                  color="#646cff"
                  bg="transparent"
                  fontWeight="bold"
                  _hover={{ textDecoration: "underline" }}
                  height="auto"
                  minW="unset"
                  onClick={() => handleAccept(request.id)}
                >
                  "Acceptă"
                </Button>
                {`\n}`}
              </Box>
            ) : null
          )
        ) : (
          <Flex
            justify="center"
            align="center"
            direction="column"
            h="100%"
            textAlign="center"
            color="white"
          >
            <Text
              mt={6}
              fontSize="4xl"
              fontWeight="bold"
              color="#white"
              animation={"pulseGlow 2s infinite"}
            >
              Nu ai cereri primite!
            </Text>
            <Text mt={4} fontSize="xl" color="#646cff">
              Când cineva îți trimite o cerere de prietenie, o vei vedea aici!
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default RequestSection;
