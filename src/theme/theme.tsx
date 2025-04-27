import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        main: { value: "'Figtree', sans-serif" },
        second: { value: "'Figtree', sans-serif" },
        nura: { value: "'Nura', sans-serif" },
      },
      colors: {
        brand: {
          100: { value: "#E3F2FD" },
          500: { value: "#2196F3" },
          900: { value: "#0D47A1" },
        },
      },
    },
  },
});
