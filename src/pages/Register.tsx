import { Box, Heading, Input, Text, Button, useToast } from "@chakra-ui/react";
import { MutableRefObject, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../models/Client";


export default function Register() {

  // States
  const [ loading, setLoading ] = useState(false);

  const nav = useNavigate();
  const toast =  useToast();

  // Refrences
  const nameref = useRef() as MutableRefObject<HTMLInputElement>;
  const emailref = useRef() as MutableRefObject<HTMLInputElement>;
  const passref = useRef() as MutableRefObject<HTMLInputElement>;

  const handleRegister = async () => {
    // Error handling
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailref.current.value == '' || passref.current.value == '' || nameref.current.value == '') {
      toast({
        title: "Empty Fields",
        description: "No field can be left empty",
        status: "error"
      })
      return;
    }

    if (email_regex.test(emailref.current.value) == false) {
      toast({
        title: "Invalid Email",
        description: "The email has to be valid",
        status: "error"
      })
      return;
    }

    if (passref.current.value.length < 6) {
      toast({
        title: "Password too short",
        description: "Password has to contain at least 6 characters",
        status: "error"
      })
    }
    
    
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: emailref.current.value,
      password: passref.current.value,
      options: {
        data: {
          username: nameref.current.value,
          image: null
        }
      }
    });

    if (error == null) {
      setLoading(false);
      toast({
        title: "Verify Email",
        description: "An email has been sent. Please verify",
        status: "info",
      })
    } else {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <Box marginTop={12} display='flex' flexDir='column' alignItems='center'>
      <Heading textAlign='center'>Register</Heading>
      <Box w='30vw' marginTop={8} h='28vh' display='flex' flexDir='column' justifyContent='space-around' alignItems='center'>
        <Input ref={nameref} placeholder="Username" type='text' focusBorderColor="red.300" />
        <Input ref={emailref} placeholder='Email' type='email' focusBorderColor="red.300" />
        <Input ref={passref} placeholder='Password' type='password' focusBorderColor="red.300" />
        <Button w='100%' bgColor='red.300' color='white' _hover={{bgColor: 'red.400'}} onClick={handleRegister} isLoading={loading}>Register</Button>
        <Text>Already a user? <Text as='span' color='red.300' cursor={"pointer"} onClick={() => {nav('/login')}}>Login</Text></Text>
      </Box>
    </Box>
  )
}