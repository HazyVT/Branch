import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    text: {
      main: "#151519",
    },
    background: {
      main: "#eeeef2",
      50: "#f1f1f4",
      100: "#e2e2e9",
      200: "#c5c5d3",
      300: "#a9a9bc",
      400: "#8c8ca6",
      500: "#6f6f90",
      600: "#595973",
      700: "#434356",
      800: "#2c2c3a",
      900: "#16161d",
    },
    primary: {
      main: "#3b3b54",
      50: "#f0f0f4",
      100: "#e1e1ea",
      200: "#c3c3d5",
      300: "#a5a5c0",
      400: "#8888aa",
      500: "#6a6a95",
      600: "#555577",
      700: "#3f3f5a",
      800: "#2a2a3c",
      900: "#15151e",
    },
    secondary: {
      main: "#9b9dbf",
      50: "#eff0f5",
      100: "#e0e0eb",
      200: "#c1c2d7",
      300: "#a2a3c3",
      400: "#8385af",
      500: "#63669c",
      600: "#50527c",
      700: "#3c3d5d",
      800: "#28293e",
      900: "#14141f",
    },
    accent: {
      main: "#4c4e85",
      50: "#efeff6",
      100: "#dfdfec",
      200: "#bebfda",
      300: "#9e9fc7",
      400: "#7d7fb5",
      500: "#5d5fa2",
      600: "#4a4c82",
      700: "#383961",
      800: "#252641",
      900: "#131320",
    },
  },
});



ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
)
