import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      as="footer"
      width="100%"
      height="30px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontFamily="Nura"
      fontWeight={900}
      fontSize={{base: "sm", md: "xl"}}
      bg="gray.100"
      mt="auto"
      bgColor={"#646cff"}
    >
      <Text>CodeFest {currentYear}</Text>
    </Box>
  );
};

export default Footer;
