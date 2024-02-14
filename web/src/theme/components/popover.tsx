import { popoverAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  body: {
    bg: "neon.800",
  },
  content: {
    maxW: "xl",
    borderColor: "bg.light",
    outline: "0 !important",
    boxShadow:"none !important",
    _focus: {
      outline: "0 !important",
      outlineOffset: 0,
    },
    _focusVisible: {
      outline: "0 !important",
      outlineOffset: 0,
    },
  },
  arrow: {
    color: "bg.light",
  },
});

export const popoverTheme = defineMultiStyleConfig({ baseStyle });
