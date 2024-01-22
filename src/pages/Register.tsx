import { Box, Heading, Input, Text, Button, useToast  } from "@chakra-ui/react"
import { MutableRefObject, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { supabase } from "../components/Client";

export default function Register() {

  const nameref = useRef() as MutableRefObject<HTMLInputElement>;
  const emailref = useRef() as MutableRefObject<HTMLInputElement>;
  const passref = useRef()  as MutableRefObject<HTMLInputElement>;
  const toast = useToast();
  const nav = useNavigate();

  const signup = async () => {
    const { error } = await supabase.auth.signUp({
      email: emailref.current.value,
      password: passref.current.value,
      options: {
        data: {
          username: nameref.current.value
        }
      }
    });
    if (error == null) {
      toast({
        title: "Verify Email",
        description: "Please verify your email to complete sign up",
        status: "info"
      })
    }
  }

  return (
    <Box marginTop={4} display='flex' flexDir='column' alignItems='center'>
      <Heading textAlign='center'>Register</Heading>
      <Box marginTop={8} w='30vw' h='28vh' display='flex' flexDir='column' justifyContent='space-around'>
        <Input ref={nameref} focusBorderColor="red.200" shadow='md' placeholder="Username" />
        <Input ref={emailref} focusBorderColor="red.200" shadow='md' placeholder="Email" />
        <Input ref={passref} focusBorderColor="red.200" shadow='md' placeholder="Password" type='password' />
        <Button bgColor='red.300' color='white' _hover={{bgColor: 'red.400'}} onClick={signup}>Register</Button>
        <Text textAlign='center'>Already have an account? <Text as='span' color='red.300' cursor={"pointer"} onClick={() => {nav('/login')}}>Login</Text></Text>
      </Box>
    </Box>
  )
}