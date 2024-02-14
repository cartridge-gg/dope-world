import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

const primaryStyle = definePartsStyle({
  field: {
    height:"48px",
    fontSize:"18px",
    border: "solid 2px",
    borderColor: "bg.light",
    bg: "bg.light",
    color: "neon.200",
    textAlign: "right",
    _focus: {
      borderColor: "border.default",
      outlineColor: "transparent",
    },
    _focusVisible: {
      borderColor: "border.default",
      outlineColor: "transparent",
      boxShadow: "none",
    },
    _placeholder: {
      color: "neon.500",
    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: { primary: primaryStyle },
  defaultProps: {
    variant: "primary",
  },
});
