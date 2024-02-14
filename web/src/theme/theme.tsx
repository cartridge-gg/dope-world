import { extendTheme } from "@chakra-ui/react";

import { colors } from "./colors";

import { buttonTheme } from "./components/button";
import { cardTheme } from "./components/card";
import { headingTheme } from "./components/heading";
import { inputTheme } from "./components/input";
import { stepperTheme } from "./components/stepper";
import { popoverTheme } from "./components/popover";
import { tabsTheme } from "./components/tabs";
import { modalTheme } from "./components/modal";

import { fonts } from "./fonts";

const styles = {
  global: {
    body: {
      bg: "bg.dark",
      color: "text.default",
      fontSize:"14px",
    },
    button: {
      bg: "bg.dark",
      borderColor: "bg.dark",
    },
  },
};

const theme = extendTheme({
  fonts,
  colors,
  styles,
  components: {
    Button: buttonTheme,
    Card: cardTheme,
    Heading: headingTheme,
    Input: inputTheme,
    Stepper: stepperTheme,
    Popover: popoverTheme,
    Tabs: tabsTheme,
    Modal: modalTheme,
  },
});

export default theme;
