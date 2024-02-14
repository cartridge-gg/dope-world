import { defineStyleConfig } from "@chakra-ui/react";

const baseStyle = {
  // select the indicator part
  indicator: {
    bg: "bg.dark",
    borderColor: "bg.light",
  },
};

const variants = defineStyleConfig({
  //   complete: {
  //     indicator: {
  //       color: "neon.200",
  //       bg: "error.default", // Use the custom color for complete steps
  //     },
  //   },
  //   active: {
  //     indicator: {
  //       bg: "yellow", // Use the custom color for active steps
  //     },
  //   },
});

export const stepperTheme = { baseStyle, variants };
