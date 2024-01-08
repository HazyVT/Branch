import { Box, Button, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box marginTop={12} display='flex' flexDir='column' alignItems='center'>
      <Heading size='3xl'>Welcome to <Heading as='span' size='3xl' color='red.300'>Branch</Heading></Heading>
      <Text color='gray.400' textAlign='center' marginTop={6} fontSize={24} w='20vw'>Create quick visualizations for your data hassle free</Text>
      <Button marginTop={6} bgColor={'red.300'} color='white' _hover={{bgColor: 'red.400'}}>Get Started</Button>
    </Box>
  )
}