import { Box, Heading, Text } from "@chakra-ui/layout";

export default function Home() {
  return (
    <Box marginTop={12}>
      <Heading textAlign='center' size='4xl'>Welcome to <Heading size='4xl' as='span' color='red.300'>Branch</Heading></Heading>
      <Text textAlign='center' marginTop={2}>A simple task manager. Be more efficient with branch.</Text>
    </Box>
  )
}