import { Box, Flex, Button } from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import ChatSection from "../components/ChatSection";
import FriendsSection from "../components/FriendsSection";
import Footer from "../../../components/Footer/Footer";
import RequestsSection from "../components/RequestsSection";
import { motion, AnimatePresence } from "framer-motion";

const Social = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "friends" | "requests">(
    () =>
      (localStorage.getItem("socialTab") as "chat" | "friends" | "requests") ||
      "chat"
  );

  return (
    <>
      <Box>
        <Navbar />
        <Flex direction="column" pt={36} minH="100vh" alignItems="center">
          <Box
            display={"flex"}
            justifyContent={"space-around"}
            border={"1px solid black"}
            borderRadius={"3xl"}
            bgColor={"#646cff"}
            boxShadow="lg"
            w="60%"
            fontFamily={"Inter"}
            py={4}
          >
            <Button
              onClick={() => setActiveTab("chat")}
              fontSize={"xl"}
              fontWeight={"bold"}
              px={8}
            >
              Chat
            </Button>
            <Button
              onClick={() => setActiveTab("friends")}
              fontSize={"xl"}
              fontWeight={"bold"}
              px={8}
            >
              Friends
            </Button>
            <Button
              onClick={() => setActiveTab("requests")}
              fontSize={"xl"}
              fontWeight={"bold"}
              px={8}
            >
              Requests
            </Button>
          </Box>
          <Box
            w={"80%"}
            mt={8}
            p={4}
            borderRadius="xl"
            bgColor="black"
            h={"65vh"}
            overflowY="hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "chat" && <ChatSection />}
                {activeTab === "friends" && (
                  <FriendsSection onStartChat={() => setActiveTab("chat")} />
                )}
                {activeTab === "requests" && <RequestsSection />}
              </motion.div>
            </AnimatePresence>
          </Box>
          <Footer />
        </Flex>
      </Box>
    </>
  );
};

export default Social;
