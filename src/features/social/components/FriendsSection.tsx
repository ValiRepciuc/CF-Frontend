import {
  Box,
  Text,
  Button,
  Flex,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  useGetFriendships,
  useSendFriendshipRequest,
} from "../hooks/useFriendship";
import { getOrCreateConversation } from "../services/ConversationService";
import { useState } from "react";

interface FriendsSectionProps {
  onStartChat: () => void;
}

const FriendsSection = ({ onStartChat }: FriendsSectionProps) => {
  const { friendships, loading } = useGetFriendships();
  const { sendRequest } = useSendFriendshipRequest();
  const currentUserName = JSON.parse(localStorage.getItem("user")!).userName;
  const [username, setUsername] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleStartChat = async (userId: string) => {
    try {
      const conversation = await getOrCreateConversation(userId);
      if (conversation?.id) {
        onStartChat();
      }
    } catch (error) {
      console.error("Failed to start chat:", error);
    }
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box fontFamily="Inter" p={4} h="100%" overflow="hidden">
      <Flex direction="column" h="100%" maxH="100%">
        <Box mb={4} minH="100px">
          <Flex
            direction={isMobile ? "column" : "row"}
            gap={4}
            justifyContent="space-between"
            alignItems="center"
          >
            <Flex direction="row" alignItems="center" gap={3}>
              <Text fontSize="lg" fontWeight="bold" color="white">
                Adaugă prieten:
              </Text>
              <Input
                placeholder="Username prieten.."
                color="white"
                fontSize="md"
                bg="#1f1f1f"
                border="1px solid #646cff"
                _focus={{ borderColor: "#646cff" }}
                w="200px"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button
                color="#646cff"
                bg="transparent"
                fontWeight="bold"
                border="1px solid #646cff"
                _hover={{ bg: "#646cff20" }}
                onClick={() => sendRequest(username)}
              >
                Adaugă
              </Button>
            </Flex>

            <Flex direction="row" alignItems="center" gap={3}>
              <Text fontSize="lg" fontWeight="bold" color="white">
                Caută prieteni:
              </Text>
              <Input
                placeholder="Username prieten.."
                fontSize="md"
                bg="#1f1f1f"
                border="1px solid #646cff"
                _focus={{ borderColor: "#646cff" }}
                w="200px"
                color="white"
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              />
            </Flex>
          </Flex>
        </Box>

        {/* 🔹 Scroll doar pe lista de prieteni */}
        <Box
          bg="#181818"
          borderRadius="lg"
          p={4}
          overflowY="auto"
          border="1px solid #646cff"
          boxShadow="md"
          display="flex"
          flexDirection="column"
          gap={3}
          h="48vh"
        >
          {loading ? (
            <Text color="white">Se încarcă prietenii...</Text>
          ) : friendships.length > 0 ? (
            friendships.map((friendship) =>
              !friendship.isAccepted ||
              !(
                friendship.requester.userName === currentUserName
                  ? friendship.receiver.userName
                  : friendship.requester.userName
              )
                .toLowerCase()
                .includes(searchQuery) ? null : (
                <Box
                  key={friendship.id}
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
                  &nbsp;&nbsp;{`"username"`}: "
                  {friendship.requester.userName === currentUserName
                    ? friendship.receiver.userName
                    : friendship.requester.userName}
                  ",{`\n`}
                  &nbsp;&nbsp;{`"status"`}: "Friends",{`\n`}
                  &nbsp;&nbsp;{`"message"`}:{" "}
                  <Button
                    color="#646cff"
                    bg="transparent"
                    fontWeight="bold"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() =>
                      handleStartChat(
                        friendship.requester.userName === currentUserName
                          ? friendship.receiver.id
                          : friendship.requester.id
                      )
                    }
                    p={0}
                    m={0}
                    height="auto"
                    minW="unset"
                  >
                    "Send Message"
                  </Button>
                  {`\n}`}
                </Box>
              )
            )
          ) : (
            <Flex
              direction="column"
              align="center"
              justify="center"
              mt={8}
              p={6}
              bg="#141414"
              border="1px solid #646cff50"
              borderRadius="md"
              color="white"
              maxW="400px"
              mx="auto"
              textAlign="center"
            >
              <Text fontSize="xl" fontWeight="bold" color="#646cff" mb={2}>
                Nu ai prieteni adăugați 🫂
              </Text>
              <Text fontSize="md" color="gray.300">
                Poți adăuga un prieten folosind bara de adăugare de mai sus.
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default FriendsSection;
