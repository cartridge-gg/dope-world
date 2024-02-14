import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    color:"neon.200",
    borderRadius:"lg"
  },
  header: {
  },
  body: {
  },
  footer: {
  },
})


export const cardTheme = defineMultiStyleConfig({ baseStyle })