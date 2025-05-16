import { Box } from "@chakra-ui/react";

interface GlitchLogoProps {
  displayText: string;
  fontFamily: string;
  glitching: boolean;
}

const GlitchLogo: React.FC<GlitchLogoProps> = ({
  displayText,
  fontFamily,
  glitching,
}) => {
  return (
    <Box
      position={"absolute"}
      top={4}
      left={12}
      fontFamily={fontFamily}
      fontWeight={900}
      fontSize={glitching ? "5xl" : "5xl"}
      color={"#646cff"}
      animation={
        glitching
          ? "smallShakeLogo 0.5s infinite, pulseGlow 2s infinite"
          : "pulseGlow 2s infinite"
      }
    >
      {displayText}
    </Box>
  );
};

export default GlitchLogo;
