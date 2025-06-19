import { Message, useConversations } from "../hooks/useConversation";
import { useConversationById } from "../hooks/useConversation";
import { useMessage } from "../hooks/useMessage";
import { useEffect, useRef, useState } from "react";
import { Box, Text, Flex, HStack, Button, Input } from "@chakra-ui/react";
import { useConversationSignalR } from "../../../hooks/useConversationSignalR";
import { useConversationsSignalR } from "../../../hooks/useConversationsSignalR";

const ChatSection = () => {
  const { conversations, loading, setConversations } = useConversations(); // adaugă set
  const [searchQuery, setSearchQuery] = useState<string>("");

  useConversationsSignalR((updatedConv) => {
    setConversations((prev) => {
      const exists = prev.some((c) => c.id === updatedConv.id);
      return exists
        ? prev.map((c) => (c.id === updatedConv.id ? updatedConv : c))
        : [updatedConv, ...prev];
    });
  });

  const [conversationId, setConversationId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const { messages: initialMessages, loadingMessages } = useConversationById(
    conversationId || ""
  );
  const { sendMessage, message, setMessage } = useMessage(conversationId || "");

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const currentUserName = JSON.parse(localStorage.getItem("user")!).userName;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useConversationSignalR(conversationId || "", (msg) => {
    setMessages((prev) => {
      const updated = [...prev, msg];
      setTimeout(() => window.dispatchEvent(new Event("resize")), 0);
      return updated;
    });
  });

  return (
    <Box fontFamily={"Inter"}>
      <Flex h="63vh" gap={4}>
        <Box
          w="25%"
          h={"62vh"}
          bg="#181818"
          borderRadius="lg"
          p={4}
          overflowY="auto"
          border="1px solid #646cff"
          boxShadow="md"
          display="flex"
          flexDirection="column"
          gap={3}
        >
          {loading ? (
            <Text>Loading conversations...</Text>
          ) : conversations.length === 0 ? (
            <Box
              textAlign="center"
              color="white"
              fontWeight="semibold"
              fontSize="md"
              mt={12}
              px={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                bg="#646cff20"
                border="1px solid #646cff80"
                borderRadius="lg"
                p={4}
                maxW="90%"
                transition="all 0.3s ease"
                _hover={{ bg: "#646cff30", transform: "scale(1.02)" }}
              >
                <Text fontSize="xl" color="#646cff" fontWeight="bold">
                  Nu ai conversații active 💬
                </Text>
                <Text fontSize="sm" color="gray.400" mt={2}>
                  Poți iniția una nouă din secțiunea{" "}
                  <Text as="span" color="#646cff" fontWeight="semibold">
                    Friends
                  </Text>{" "}
                  accesând profilul unui prieten.
                </Text>
              </Box>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={4}>
              <Input
                placeholder="Caută conversații..."
                value={searchQuery}
                font={"Inter"}
                fontSize={"xl"}
                fontWeight={"bold"}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg="#1f1f1f"
                color="white"
                border="1px solid #646cff"
                _focus={{ borderColor: "#646cff" }}
                mb={2}
              />
              {conversations
                .filter((conv) =>
                  conv.otherUsername
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((conv) => (
                  <Button
                    key={conv.id}
                    onClick={() => setConversationId(conv.id)}
                    variant={conv.id === conversationId ? "solid" : "ghost"}
                    color="white"
                    bg={conv.id === conversationId ? "#646cff" : "#1f1f1f"}
                    fontWeight="bold"
                    fontSize="md"
                    _hover={{ bg: "#5355c4" }}
                    border="1px solid #646cff30"
                    borderRadius="md"
                    textAlign="left"
                    justifyContent="flex-start"
                    px={4}
                    py={3}
                  >
                    {conv.otherUsername}
                  </Button>
                ))}
            </Box>
          )}
        </Box>
        <Flex
          direction="column"
          flex="1"
          border="1px"
          borderColor="gray.300"
          borderRadius="md"
        >
          <Box p={4} overflowY={"auto"} flex="1">
            {conversationId === null ? (
              <Flex
                flex="1"
                justify="center"
                align="center"
                textAlign="center"
                px={4}
                py={8}
                direction="column"
              >
                <Box
                  bg="#646cff20"
                  border="1px solid #646cff80"
                  borderRadius="lg"
                  p={6}
                  maxW="90%"
                  transition="all 0.3s ease"
                  _hover={{ bg: "#646cff30", transform: "scale(1.02)" }}
                >
                  <Text fontSize="2xl" fontWeight="bold" color="#646cff">
                    Selectează o conversație 💬
                  </Text>
                  <Text mt={2} fontSize="md" color="gray.400">
                    Alege un prieten din stânga pentru a începe o discuție.
                  </Text>
                </Box>
              </Flex>
            ) : loadingMessages ? (
              <Text>Loading messages...</Text>
            ) : (
              <Box p={4} overflowY="auto" flex="1">
                <Flex
                  direction="column"
                  flex="1"
                  overflowY="auto"
                  px={4}
                  py={2}
                >
                  {messages.map((m, i) => {
                    const isMe = m.senderName === currentUserName;
                    return (
                      <Flex
                        key={i}
                        justifyContent={isMe ? "flex-end" : "flex-start"}
                        mb={2}
                      >
                        <Box
                          bg={isMe ? "#646cff" : "gray.200"}
                          color={isMe ? "white" : "black"}
                          borderRadius="md"
                          px={4}
                          py={2}
                          maxW="70%"
                        >
                          <Text fontSize="lg" fontWeight="semibold">
                            {isMe ? "Tu" : m.senderName}
                          </Text>
                          <Text fontSize="md" fontWeight={"bold"}>
                            {m.content}
                          </Text>
                          <Text
                            fontSize="2xs"
                            textAlign={isMe ? "right" : "left"}
                            mt={1}
                          >
                            {m.createdAt}
                          </Text>
                        </Box>
                      </Flex>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </Flex>
              </Box>
            )}
          </Box>
          {conversationId && (
            <HStack position="sticky" bottom="0" p={4} borderTop="1px">
              <Input
                borderColor="#646cff"
                _active={{ borderColor: "#646cff" }}
                placeholder="Mesaj..."
                flex="1"
                fontSize={"xl"}
                p={6}
                value={message.content}
                onChange={(e) => setMessage({ content: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <Button
                bg="#646cff"
                color="white"
                _hover={{ bg: "#5355c4" }}
                _active={{ opacity: 0.8 }}
                fontSize={"xl"}
                onClick={sendMessage}
                p={6}
              >
                Trimite
              </Button>
            </HStack>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default ChatSection;
