import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Navbar />
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        px={4}
        pt={48}
        bg="black"
        color="white"
        fontFamily="Inter"
        textAlign="center"
      >
        <FaExclamationTriangle size={48} color="#646cff" />
        <Text fontSize="5xl" fontWeight="bold" mt={6}>
          404 - Pagina nu a fost găsită
        </Text>
        <Text fontSize="lg" color="gray.400" mt={4}>
          Se pare că ai rătăcit calea prin cod... dar nu-ți face griji, te putem
          întoarce la provocări!
        </Text>
        <Button
          mt={8}
          bg="#646cff"
          color="white"
          onClick={() => navigate("/")}
          _hover={{ bg: "#5355c4" }}
          fontWeight="bold"
          size="lg"
        >
          Înapoi la pagina principală
        </Button>
        <Footer />
      </Flex>
    </Box>
  );
};

export default NotFound;
