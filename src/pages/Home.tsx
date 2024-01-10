import { Box, Button, Heading, Text } from "@chakra-ui/react";
import User from "../models/User";
import { useNavigate } from "react-router";

export default function Home(props: {user: User | null}) {

  const user =  props.user;
  const nav = useNavigate();

  return (
    <Box marginTop={12} display='flex' flexDir='column' alignItems='center'>
      <Heading size='3xl'>Welcome to <Heading as='span' size='3xl' color='red.300'>Branch</Heading></Heading>
      <Text color='gray.400' textAlign='center' marginTop={6} fontSize={24} w='20vw'>Create quick visualizations for your data hassle free</Text>
      <Button marginTop={6} bgColor={'red.300'} color='white' _hover={{bgColor: 'red.400'}} onClick={() => nav(user ? '/collection' : '/login')}>{user ? 'To Your Data' : 'Get Started'}</Button>
    </Box>
  )
}