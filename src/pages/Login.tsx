import { Box, Button, Heading, Icon, Input } from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";
import { signInWithOauth } from "../models/supabase";

export default function Login() {
    return (
        <Box textAlign='center'>
            <Heading size='2xl'>Login</Heading>
            <Box marginTop={16} display='flex' flexDir='column' alignItems='center'>
                <Input type='email' w='50vw' placeholder='Email' focusBorderColor="primary.300"/>
                <Input type='password' w='50vw' placeholder="Password" focusBorderColor="primary.300" marginTop={4}/>
                <Button 
                    marginTop={8} 
                    w='50vw' 
                    bgColor='primary.400' 
                    color='white' 
                    _hover={{bgColor: 'primary.500'}}
                >Login</Button>
            </Box>
            <Box marginTop={12}>
                <Icon 
                    as={BsGithub} 
                    w={6} h={6}
                    cursor="pointer"
                    onClick={() => signInWithOauth('github')}
                />
            </Box>
        </Box>
    )
}