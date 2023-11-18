import { Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box textAlign='center'>
      <Heading size='3xl'>Welcome to <Text color='#a468d9'>Branch</Text></Heading>
      <Text padding={1}>A student study hub for productivity</Text>
    </Box>
  )
}