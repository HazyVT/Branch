import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { supabase } from "../models/Client";
import { MutableRefObject, useRef } from "react";
import { useNavigate } from "react-router";

export default function Login() {

  const emailref = useRef() as MutableRefObject<HTMLInputElement>;
  const passref = useRef() as MutableRefObject<HTMLInputElement>;
  const nav = useNavigate();
  

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: emailref.current.value,
      password: passref.current.value
    })

    if (error == null ) {
      nav('/');
      window.location.reload();
    } else {
      console.error(error);
    }
  }


  return (
    <Box display='flex' flexDir='column' alignItems='center'>
      <Heading>Login</Heading>
      <Box marginTop={4} display='flex' flexDir='column' alignItems='center'>
        <Input ref={emailref} w='70vw' placeholder="Email" type='email' focusBorderColor={'red.300'}/>
        <Input ref={passref} w='70vw' marginTop={4} placeholder="Password" type='password' focusBorderColor={'red.300'}/>
      </Box>
      <Button onClick={handleLogin} marginTop={4} bgColor='red.300' color='white' _hover={{bgColor: 'red.400'}}>Login</Button>
      <Text marginTop={4}>Not a user? <Text as='span' color='red.300'>Register</Text></Text>
    </Box>
  )
}