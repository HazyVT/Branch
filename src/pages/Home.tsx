import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const nav = useNavigate();
  
  return (
    <Box marginTop={12} display='flex' flexDir='column' alignItems='center'>
      <Heading textAlign='center' size='4xl'>Welcome to <Heading size='4xl' as='span' color='red.300'>Branch</Heading></Heading>
      <Text textAlign='center' marginTop={2}>A simple task manager. Be more efficient with branch.</Text>
      <Box marginTop={8}>
        <Button color='white' onClick={() => {nav('/login')}} marginRight={8} bgColor='red.300' _hover={{bgColor: 'red.400'}}>Sign In</Button>
        <Button onClick={() => {nav('/register')}}>Sign Up</Button>
      </Box>
    </Box>
  )
}