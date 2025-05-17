import { Box } from "@chakra-ui/react";
import "../../styles/navbar.css";

interface LogoProps {
  displayText: string;
  codeText: string;
  onCodeClick?: () => void;
  animate?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  displayText,
  codeText,
  onCodeClick,
  animate,
}) => {
  return (
    <Box
      textAlign="center"
      fontFamily="Nura"
      fontWeight={900}
      fontSize="4xl"
      animation={"pulseGlowNavbar 2s infinite"}
    >
      {displayText}
      <Box
        fontFamily="'Fira Code', monospace"
        fontSize="2xs"
        cursor="pointer"
        onClick={onCodeClick}
        className={animate ? "code-snippet-animate" : ""}
        lineHeight={0.8}
        _hover={{
          animation: "smallShake 0.4s ease infinite",
        }}
      >
        {codeText}
      </Box>
    </Box>
  );
};

export default Logo;
