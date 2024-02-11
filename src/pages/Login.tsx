import { Box, Button, Heading, Icon, Input, Text } from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";
import { signIn, signInWithOauth } from "../models/supabase";
import { useNavigate } from "react-router-dom";
import { MutableRefObject, useRef } from "react";

export default function Login() {

    const nav = useNavigate();
    const emailref = useRef() as MutableRefObject<HTMLInputElement>;
    const passref = useRef() as MutableRefObject<HTMLInputElement>;

    return (
        <Box textAlign='center'>
            <Heading size='2xl'>Login</Heading>
            <Box marginTop={16} display='flex' flexDir='column' alignItems='center'>
                <Input ref={emailref} type='email' w='30vw' placeholder='Email' focusBorderColor="primary.300"/>
                <Input ref={passref} type='password' w='30vw' placeholder="Password" focusBorderColor="primary.300" marginTop={4}/>
                <Button 
                    marginTop={8} 
                    w='30vw' 
                    bgColor='primary.400' 
                    color='white' 
                    _hover={{bgColor: 'primary.500'}}
                    onClick={() => signIn(emailref.current.value, passref.current.value)}
                >Login</Button>
            </Box>
            <Text marginTop={8}>Don't have an account? <Text as='span' color='primary.500' cursor={"pointer"} onClick={() => {nav('/register')}}>Sign Up</Text></Text>
            <Box marginTop={12}>
                <Icon 
                    as={BsGithub} 
                    w={6} h={6}
                    cursor="pointer"
                    _hover={{color: 'primary.500'}}
                    onClick={() => signInWithOauth('github')}
                />
            </Box>
        </Box>
    )
}