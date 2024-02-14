import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  root: {
    borderRadius: "8px",
    overflow: "hidden",
  },
  tab: {
    bg: "bg.light !important",
    borderBottom: "solid 2px !important",
    borderBottomColor: "border.default !important",
    padding: "10px",
    _selected: {
      // bg: "bg.light !important",
      borderBottom: "solid 2px !important",
      borderBottomColor: "cryellow.400 !important",
    },
    _active: {
      bg: "bg.light !important",
    },
  },
  tablist: {
    // borderTopRadius: "8px",
    bg: "bg.dark !important",
    borderBottom: "0 !important",
  },
  tabpanels: {
    color: "neon.400 !important",
    bg: "bg.dark !important",
    minHeight: "100%",
  },
  tabpanel: {
    minHeight: "100%",
    bg: "bg.dark !important",
  },
});

// export the component theme
export const tabsTheme = defineMultiStyleConfig({ baseStyle });
