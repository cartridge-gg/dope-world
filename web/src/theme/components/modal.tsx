import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
//   overlay: {
//     //bg: 'blackAlpha.200', //change the background
//   },
  dialog: {
    borderRadius: 'md',
    border:"solid 5px",
    borderColor:"bg.light"
  },
})

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
})