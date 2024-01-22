import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { MutableRefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../components/Client";

export default function Login() {

  const nav = useNavigate();
  const emailref = useRef() as MutableRefObject<HTMLInputElement>;
  const passref = useRef() as MutableRefObject<HTMLInputElement>;


  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: emailref.current.value,
      password: passref.current.value
    });
    if (error == null) {
      nav('/');
      window.location.reload();
    }
  }


  return (
    <Box marginTop={4} display='flex' flexDir='column' alignItems='center'>
      <Heading textAlign='center'>Login</Heading>
      <Box marginTop={8} w='30vw' h='24vh' display='flex' flexDir='column' justifyContent='space-around'>
        <Input ref={emailref} focusBorderColor="red.200" shadow='md' placeholder="Email" />
        <Input ref={passref} focusBorderColor="red.200" shadow='md' placeholder="Password" type='password' />
        <Button bgColor='red.300' color='white' _hover={{bgColor: 'red.400'}} onClick={login}>Login</Button>
        <Text textAlign='center'>Don't have an account? <Text as='span' color='red.300' cursor={"pointer"} onClick={() => {nav('/register')}}>Register</Text></Text>
      </Box>
    </Box>
  )
}