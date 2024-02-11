import { Box, Text, Heading, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../models/supabase";
import { useRef, MutableRefObject } from "react";

export default function Register() {

    const nav = useNavigate();
    const emailref = useRef() as MutableRefObject<HTMLInputElement>;
    const passref = useRef() as MutableRefObject<HTMLInputElement>;
    const nameref = useRef() as MutableRefObject<HTMLInputElement>;

    return (
        <Box textAlign='center'>
            <Heading size='2xl'>Register</Heading>
            <Box marginTop={16} display='flex' flexDir='column' alignItems='center'>
                <Input ref={nameref} type='text' w='30vw' placeholder='Username' focusBorderColor="primary.300"/>
                <Input ref={emailref} type='email' w='30vw' placeholder='Email' focusBorderColor="primary.300" marginTop={4}/>
                <Input ref={passref} type='password' w='30vw' placeholder="Password" focusBorderColor="primary.300" marginTop={4}/>
                <Button 
                    marginTop={8} 
                    w='30vw' 
                    bgColor='primary.400' 
                    color='white' 
                    _hover={{bgColor: 'primary.500'}}
                    onClick={() => createUser(emailref.current.value, passref.current.value, nameref.current.value)}
                >Login</Button>
            </Box>
            <Text marginTop={8}>Already have an account? <Text as='span' color='primary.500' cursor={"pointer"} onClick={() => {nav('/login')}}>Sign In</Text></Text>
        </Box>
    )
}