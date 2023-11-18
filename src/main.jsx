import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    body: '"Cabin", sans-serif',
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: '"Cabin", sans-serif',
        fontWeight: 700
      }
    }
  },
  fontSize: {
    sm: '0.750rem',
    base: '1rem',
    xl: '1.333rem',
    '2xl': '1.777rem',
    '3xl': '2.369rem',
    '4xl': '3.158rem',
    '5xl': '4.210rem',
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
)
