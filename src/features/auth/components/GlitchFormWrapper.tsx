// 1. GlitchFormWrapper.tsx - container animat pentru Login/Register
import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface GlitchFormWrapperProps {
  isVisible: boolean;
  children: ReactNode;
  glitching: boolean;
}

const GlitchFormWrapper: React.FC<GlitchFormWrapperProps> = ({
  isVisible,
  children,
  glitching,
}) => {
  return (
    <Box
      display={isVisible ? "block" : "none"}
      transition="opacity 0.4s ease, transform 0.4s ease"
      opacity={isVisible ? 1 : 0}
      pointerEvents={isVisible ? "auto" : "none"}
      className={glitching ? "glitch" : ""}
    >
      {children}
    </Box>
  );
};

export default GlitchFormWrapper;
