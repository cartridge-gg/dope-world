import { defineStyleConfig } from "@chakra-ui/react";

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    variant: "default",
  },
  baseStyle: {
    fontFamily: "ibmplex",
    fontWeight: "700",
    textTransform: "uppercase",
    borderStyle: "solid",
    borderWidth: "0",
    fontSize: "14px",
  },
  variants: {
    default: {
      color: "button.default.color",
      bgColor: "button.default.bgColor",
      _hover: {
        bgColor: "button.default.bgColorHover",
      },
    },
    primary: {
      color: "button.primary.color",
      bgColor: "button.primary.bgColor",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      _disabled: {
        _hover: {
          bgColor: "button.primary.bgColor !important",
        },
      },
      _hover: {
        bgColor: "button.primary.bgColorHover",
      },
    },
    secondary: {
      color: "button.secondary.color",
      bgColor: "button.secondary.bgColor",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      _hover: {
        bgColor: "button.secondary.bgColorHover",
      },
    },
  },
});
