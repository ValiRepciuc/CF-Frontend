import { Box, Text, Flex } from "@chakra-ui/react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { useLeaderboardComplete } from "../hooks/useLeaderboardComplete";
import { useUserAchievements } from "../hooks/useUserAchievement";

const Leaderboard = () => {
  const { leaderboard, userEntry } = useLeaderboardComplete();
  const { achievements, loading } = useUserAchievements();

  return (
    <Box bgGradient="linear(to-b, #1a1a1a, #0d0d0d)">
      <Navbar />
      <Flex
        direction="column"
        pt={36}
        minH="100vh"
        bg="#1a1a1a"
        fontFamily={"Inter"}
        fontWeight={"900"}
      >
        <Text textAlign={"center"} my={"5"} fontSize={"3xl"} color="#white">
          Clasamentul pentru <span style={{ color: "#646cff" }}>CodeFest</span>
        </Text>
        <Flex
          justifyContent="center"
          alignItems="flex-start"
          gap={16}
          p={4}
          wrap="wrap"
        >
          <Box
            bg="#121212"
            color="#646cff"
            border="1px solid #646cff"
            borderRadius="lg"
            p={6}
            fontFamily="'Fira Code', monospace"
            boxShadow="0 0 15px #646cff44"
            maxW="700px"
            animation={"fadeIn 0.7s ease-in-out"}
          >
            <Text fontSize="lg" mb={4} color="whiteAlpha.700">
              // Leaderboard - CodeFest 2025
            </Text>

            {leaderboard.map((entry) => (
              <Text
                key={entry.id}
                fontWeight={entry.isCurrentUser ? "bold" : "normal"}
                color={entry.isCurrentUser ? "#646cff" : "#ffffff"}
                _hover={{
                  transform: "scale(1.01)",
                  transition: "0.2s ease-in-out",
                }}
              >
                [{entry.rank.toString().padStart(2, "0")}]{" "}
                {entry.username.padEnd(20, " ")} ..... {entry.score} pts
              </Text>
            ))}
          </Box>
          <Box
            bg="#121212"
            color="#ffffff"
            border="1px solid #646cff"
            borderRadius="lg"
            p={6}
            fontFamily="'Fira Code', monospace"
            boxShadow="0 0 15px #646cff44"
            minW="300px"
            animation={"fadeIn 0.7s ease-in-out"}
          >
            <Text fontSize="lg" mb={4} color="whiteAlpha.700">
              // Statistici personale
            </Text>

            {userEntry ? (
              <>
                <Text>
                  Username: <strong>{userEntry.username}</strong>
                </Text>
                <Text>
                  Punctaj: <strong>{userEntry.score} pts</strong>
                </Text>
                <Text>
                  Poziție: <strong>#{userEntry.rank}</strong>
                </Text>

                <Box mt={6}>
                  <Text color="whiteAlpha.700">// Achievements obținute</Text>
                  {loading ? (
                    <Text color="gray.400">Se încarcă...</Text>
                  ) : achievements.length === 0 ? (
                    <Text color="red.300">
                      Nu ai niciun achievement! (încă)
                    </Text>
                  ) : (
                    achievements.map((ach, idx) => (
                      <Box
                        key={idx}
                        mt={2}
                        p={2}
                        border="1px solid #646cff"
                        borderRadius="md"
                        _hover={{ bg: "#1e1e1e" }}
                      >
                        <Text fontSize="sm" color="#646cff">
                          {ach.iconUrl} {ach.name}
                        </Text>
                        <Text fontSize="xs" color="whiteAlpha.700">
                          {ach.description}
                        </Text>
                      </Box>
                    ))
                  )}
                </Box>
              </>
            ) : (
              <Text color="red.300">Nu ești logat sau nu ai punctaj.</Text>
            )}
          </Box>
        </Flex>

        <Footer />
      </Flex>
    </Box>
  );
};

export default Leaderboard;
