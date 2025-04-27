import { Box, Heading, Text, Button, Stack } from "@chakra-ui/react";

interface Props {
  title: string;
  description: string;
}

const WelcomeCard: React.FC<Props> = ({ title, description }): JSX.Element => {
  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg="gray.800"
      color="white"
    >
      <Stack>
        <Heading fontWeight={900} fontFamily="nura">
          {title} Bine ai venit la CodeFest 🎉 {description}
        </Heading>
        <Text>
          În fiecare zi din decembrie, descoperi o provocare nouă. Ești gata să
          începi?
        </Text>
        <Button colorScheme="teal" variant="solid">
          Începe acum
        </Button>
      </Stack>
    </Box>
  );
};

export default WelcomeCard;
