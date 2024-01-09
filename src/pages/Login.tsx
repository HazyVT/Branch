import { Box, Button, Heading, Input, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { supabase } from "../components/Client";
import { MutableRefObject, useRef, useState } from "react";

export default function Login() {

  // States
  const [ loading, setLoading ] = useState(false);

  const nav = useNavigate();
  const toast = useToast();

  // References
  const emailref = useRef() as MutableRefObject<HTMLInputElement>;
  const passref = useRef() as MutableRefObject<HTMLInputElement>;

  const handleLogin = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailref.current.value,
      password: passref.current.value
    });
    if (error == null) {
      console.log("successful login");
      nav('/')
    } else {
      console.error(error);
      setLoading(false);
      toast({
        title: error.name,
        description: error.message,
        duration: 2000,
        status: "error"
      })
    }
  }
  
  return (
    <Box marginTop={12} display='flex' flexDir='column' alignItems='center'>
      <Heading textAlign='center'>Login</Heading>
      <Box w='30vw' marginTop={8} h='24vh' display='flex' flexDir='column' justifyContent='space-around' alignItems='center'>
        <Input ref={emailref} placeholder='Email' type='email' focusBorderColor="red.300"/>
        <Input ref={passref} placeholder='Password' type='password' focusBorderColor="red.300" />
        <Button w='100%' bgColor='red.300' color='white' _hover={{bgColor: 'red.400'}} onClick={handleLogin} isLoading={loading}>Login</Button>
        <Text>Not a user? <Text as='span' color='red.300' cursor={"pointer"} onClick={() => {nav('/register')}}>Register</Text></Text>
      </Box>
    </Box>
  )
}