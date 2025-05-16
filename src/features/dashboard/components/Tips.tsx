import { Box } from "@chakra-ui/react";

const Tips = () => {
  const dailyTips = [
    "> Fii curios, nu perfect.",
    "> Micsoreaza problema, mareste solutia.",
    ">Comenteaza gandurile, nu codul.",
    "> Testele iti salveaza timpul.",
    "> Refactorizeaza azi, nu maine.",
    "> Citeste documentatia inainte de copy-paste.",
    "> Imparte task-urile in pasi mici.",
    "> Cauta simplitatea, nu complexitatea.",
    "> Invata un nou shortcut azi.",
    "> Versioneaza des si commit-eaza des.",
  ];

  const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];

  return (
    <Box
      position="relative"
      w={{ base: "90%", md: "400px" }}
      h="80px"
      overflow="hidden"
      borderRadius="md"
      transition={"all 0.3s ease"}
      _hover={{
        boxShadow: "0 0 20px #646cff88",
        transform: "scale(1.02)",
      }}
    >
      <Box
        position="relative"
        zIndex={1}
        bg="#121212"
        border={"1px solid #646cff"}
        borderRadius="lg"
        color="#646cff"
        fontFamily="mono"
        p={4}
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="100%"
      >
        {randomTip}
      </Box>
    </Box>
  );
};

export default Tips;
